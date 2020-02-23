import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import api from '../middleware/api';
import handler from '../middleware/handler';

const history = createHashHistory();

function configureStore(initialState) {
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

  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
