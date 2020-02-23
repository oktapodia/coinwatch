import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import coins from '../modules/coins/reducers';
import settings from '../modules/settings/reducers';
import modal from '../modules/modal/reducers';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    coins,
    settings,
    form,
    modal
  });
}
