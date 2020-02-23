import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { History } from 'history';
import coins from '../modules/coins/reducers';
import icos from '../modules/icos/reducers';
import settings from '../modules/settings/reducers';
import modal from '../modules/modal/reducers';
import { connectRouter } from 'connected-react-router';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    coins,
    icos,
    settings,
    form,
    modal,
  });
}
