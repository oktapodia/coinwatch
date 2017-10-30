// @flow

import { cloneDeep, values, map } from 'lodash';
import { ipcRenderer } from 'electron';
import { GET_COINS_SUCCESS, GET_COIN_PRICE_SUCCESS, GET_EXCHANGE_LIST_SUCCESS, GET_SYMBOL_LIST_SUCCESS } from './actions';
import { SETTINGS_REMOVE_COIN } from '../settings/actions';
import formatPrice from '../../helpers/formatPrice';

const initialState = {
  prices: {},
  data: [],
  exchanges: [],
  symbols: [],
};

export default function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_REMOVE_COIN:
      return { ...state, prices: {} };
      break;
    case GET_COINS_SUCCESS:
      return { ...state, data: action.response };
      break;
    case GET_EXCHANGE_LIST_SUCCESS:
      return { ...state, exchanges: action.response };
      break;
    case GET_SYMBOL_LIST_SUCCESS:
      return { ...state, symbols: action.response };
      break;
    case GET_COIN_PRICE_SUCCESS:
      const prices = cloneDeep(state.prices);
      prices[action.data.from] = map(action.response, formatPrice).join('');

      ipcRenderer.send('tray-update', prices);

      return { ...state, prices };
      break;
    default:
      return state;
  }
}
