/* eslint-disable camelcase */

import { push } from 'react-router-redux';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_HANDLER = Symbol('Call Handler');

const callHandler = (handler, data) => {
  return handler(data)
  .then((response) => {
    if (response.status === 204) { return ({ request: {}, response }); }

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
};

/*
 * A Redux middleware that interprets actions with CALL_HANDLER info specified.
 * Performs the call and promises when such actions are dispatched.
 */

export default store => next => (action) => {
  const callHANDLER = action[CALL_HANDLER];

  if (typeof callHANDLER === 'undefined') { return next(action); }

  const { types, data, extras, handler } = callHANDLER;
  // let displayNotification = true;

/*  if (options && !options.notification) {
    displayNotification = false;
  }*/

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(body) {
    const finalAction = Object.assign({}, action, body);
    delete finalAction[CALL_HANDLER];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType, extras }));

  return callHandler(handler, data)
    .then((response) => {
      // const locale = store.getState().settings.locale;

/*      if (displayNotification) {
        // const notification = options.successMessage[locale] || options.successMessage || {};
        const notification = {};
        // notification.level = notification.level || 'success';
        notification.level = 'success';
        // notification.message = notification.message || 'Successfull!';
        notification.message = 'Successfull!';
        store.dispatch(addNotification(notification));
      }*/

      return next(actionWith({ response, type: successType, extras, data }));
    })
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

      // if (status === 403) {
/*      const notification = {};
      notification.level = 'error';
      notification.message = message;
      store.dispatch(addNotification(notification));*/
      // }

      if (status === 500) {
        return next(push('/error'));
      }

      // const notification = {};
      // notification.level = 'error';
      // notification.message = error.message;
      // store.dispatch(addNotification(notification));

      next(actionWith({ type: failureType, error, extras }));

        /*
         * break propagation
         */
      throw err;
    });
};
