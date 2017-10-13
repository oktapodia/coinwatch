// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import coins from '../modules/coins/reducers';
import settings from '../modules/settings/reducers';

const rootReducer = combineReducers({
  router,
  coins,
  settings,
  form,
});

export default rootReducer;
