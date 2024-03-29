// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';
import api from '../middleware/api';
import handler from '../middleware/handler';

const history = createHashHistory();

const rootReducer = createRootReducer();

const configureStore = (initialState: any) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Api middleware
  middleware.push(api);

  // Handler middleware
  middleware.push(handler);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Redux DevTools Configuration
  const actionCreators = {};

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators,
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
};

export default { configureStore, history };
