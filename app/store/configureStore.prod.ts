/*

function configureStore(initialState = null) {
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Api middleware
  middleware.push(api);

  // Handler middleware
  middleware.push(handler);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = compose(...enhancers);

  return createStore(rootReducer(history), initialState, enhancer);
}

export default { configureStore, history };
*/

import { createStore, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import { Store } from '../reducers/types';
import api from '../middleware/api';
import handler from '../middleware/handler';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const enhancer = applyMiddleware(thunk, api, handler);

function configureStore(initialState: any): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
