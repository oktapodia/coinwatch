import settings from 'electron-settings';
import { cloneDeep, find, map } from 'lodash';
import { ipcRenderer } from 'electron';
import {
  FORCE_REFRESH_TOGGLE,
  GET_COIN_PRICE_SUCCESS,
  GET_COINS_SUCCESS,
  GET_EXCHANGE_LIST_SUCCESS,
  GET_SYMBOL_LIST_SUCCESS,
  SETTINGS_REMOVE_COIN_SUCCESS,
  SETTINGS_SAVE_COIN_SUCCESS,
  SETTINGS_TOGGLE_VISIBILITY_SUCCESS,
} from './actions';
import { TRAY_UPDATE } from '../../main/Tray';

const TREND_LOWER = 'lower';
const TREND_HIGHER = 'higher';

const initialState = {
  data: {},
  exchanges: [],
  symbols: [],
  coins: settings.get('coins') || [],
  previousCoins: [],
  forceRefresh: false,
};

export default function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_TOGGLE_VISIBILITY_SUCCESS: {
      const coins = cloneDeep(state.coins);
      const coin = find(coins, (c) => c.slug === action.data.slug);

      coin.visibility = !coin.visibility;

      settings.set('coins', coins);

      return { ...state, coins };
    }
    case SETTINGS_SAVE_COIN_SUCCESS:
      return { ...state, coins: settings.get('coins') };
    case SETTINGS_REMOVE_COIN_SUCCESS:
      return { ...state, coins: settings.get('coins') };
    case GET_COINS_SUCCESS:
      return { ...state, data: action.response };
    case GET_EXCHANGE_LIST_SUCCESS:
      return { ...state, exchanges: action.response };
    case GET_SYMBOL_LIST_SUCCESS:
      return { ...state, symbols: action.response };
    case FORCE_REFRESH_TOGGLE:
      return { ...state, forceRefresh: !state.forceRefresh };
    case GET_COIN_PRICE_SUCCESS: {
      const coins = cloneDeep(state.coins);
      const coin = find(coins, (c) => c.slug === action.data.slug);
      const previousCoin = find(state.previousCoins, (c) => c.slug === action.data.slug);

      if (!coin) {
        return { ...state };
      }

      coin.price = map(action.response).join('');

      if (previousCoin && coin.price < previousCoin.price) {
        coin.trend = TREND_LOWER;
      } else if (previousCoin && coin.price > previousCoin.price) {
        coin.trend = TREND_HIGHER;
      } else {
        coin.trend = previousCoin && previousCoin.trend;
      }

      ipcRenderer.send(TRAY_UPDATE, coins);

      return { ...state, coins, previousCoins: state.coins };
    }
    default:
      return state;
  }
}
