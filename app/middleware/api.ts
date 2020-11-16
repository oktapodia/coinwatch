import axios from 'axios';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

/*
 * Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 * Read more about Normalizr: https://github.com/gaearon/normalizr
 */

const callApi = (method, url, data) =>
  axios({ method, url, data })
    .then((response) => {
      if (response.status === 204) {
        return { request: {}, response };
      }

      return {
        request: data,
        response,
      };
    })
    .then((response) => {
      if (!response.statusText === 'OK') {
        const error = new Error('API middleware: response is not OK');
        error.json = response.data;
        error.response = response;

        return Promise.reject(error);
      }

      return response.response.data;
    });

/*
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 */

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, method, data, extras } = callAPI;

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  if (typeof method !== 'string') {
    throw new Error('Expected method to be a string.');
  }
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  function actionWith(body) {
    const finalAction = { ...action, ...body };
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType, endpoint, extras }));

  return callApi(method, endpoint, data)
    .then((response) =>
      next(
        actionWith({
          response,
          endpoint,
          type: successType,
          extras,
        })
      )
    )
    .catch((err) => {
      const { message, status } = err;

      /*
       * handle the error
       */
      let error = null;
      if (message instanceof Error) {
        error = message;
      } else {
        error = new Error('Something bad happened');
      }

      error.status = status || 500;

      if (status === 500) {
        return next();
      }

      next(
        actionWith({
          endpoint,
          type: failureType,
          error,
          extras,
        })
      );

      /*
       * break propagation
       */
      throw err;
    });
};
