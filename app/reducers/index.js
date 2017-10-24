// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import coins from '../modules/coins/reducers';
import icos from '../modules/icos/reducers';
import settings from '../modules/settings/reducers';

const rootReducer = combineReducers({
  router,
  coins,
  icos,
  settings,
  form,
});

export default rootReducer;
