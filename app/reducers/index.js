// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import coins from '../modules/coins/reducer';
import settings from '../modules/settings/reducer';

const rootReducer = combineReducers({
  router,
  coins,
  settings,
  form,
});

export default rootReducer;
