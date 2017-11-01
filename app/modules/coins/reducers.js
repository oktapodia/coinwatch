// @flow

import settings from 'electron-settings';
import { cloneDeep, values, map, findIndex, find } from 'lodash';
import { ipcRenderer } from 'electron';
import {
  GET_COINS_SUCCESS,
  GET_COIN_PRICE_SUCCESS,
  GET_EXCHANGE_LIST_SUCCESS,
  GET_SYMBOL_LIST_SUCCESS,
  SETTINGS_REMOVE_COIN_SUCCESS,
  SETTINGS_SAVE_COIN_SUCCESS,
  SETTINGS_TOGGLE_VISIBILITY_SUCCESS,
} from './actions';
import formatPrice from '../../helpers/formatPrice';
import { TRAY_UPDATE } from '../../main/Tray';

const initialState = {
  data: [],
  exchanges: [],
  symbols: [],
  coins: settings.get('coins') || [],
};

export default function coinsReducer(state = initialState, action) {
  let coins = null;
  let coin = null;
  switch (action.type) {
    case SETTINGS_TOGGLE_VISIBILITY_SUCCESS:
      coins = cloneDeep(state.coins);
      coin = find(coins, (c) => c.slug === action.data.slug);

      coin.visibility = !coin.visibility;

      settings.set('coins', coins);

      return { ...state, coins };
      break;
    case SETTINGS_SAVE_COIN_SUCCESS:
      return { ...state, coins: settings.get('coins') };
      break;
    case SETTINGS_REMOVE_COIN_SUCCESS:
      return { ...state, coins: settings.get('coins') };
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
      coins = cloneDeep(state.coins);
      coin = find(coins, (c) => c.slug === action.data.slug);

      if (!coin) {
        return { ...state };
      }

      coin.price = map(action.response, formatPrice).join('');

      ipcRenderer.send(TRAY_UPDATE, coins);

      return { ...state, coins };
      break;
    default:
      return state;
  }
}
