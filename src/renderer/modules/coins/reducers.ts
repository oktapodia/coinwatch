// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { cloneDeep, find, map, findIndex } from 'lodash';
import settings from '../../utils/settings';
import {
  FORCE_REFRESH_TOGGLE,
  GET_COIN_PRICE_SUCCESS,
  GET_COINS_SUCCESS,
  GET_SYMBOL_LIST_SUCCESS,
  SETTINGS_REMOVE_COIN_SUCCESS,
  SETTINGS_SAVE_COIN_SUCCESS,
  SETTINGS_TOGGLE_VISIBILITY_SUCCESS,
  SETTINGS_SAVE_ALERT_SUCCESS,
} from './actions';
import ETrend from '../../../types/ETrend';

const initialState = {
  data: {},
  exchanges: [],
  symbols: [],
  coins: (settings.get('coins') as any) || [],
  previousCoins: [],
  forceRefresh: false,
  alertsSettings: (settings.get('alerts') as any) || [],
  alerts: {},
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function coinsReducer(state = initialState, action) {
  console.log(state, settings.get('coins'), settings.get());

  switch (action.type) {
    case SETTINGS_TOGGLE_VISIBILITY_SUCCESS: {
      const coins = cloneDeep(state.coins);
      const coin = find(coins, (c) => c.slug === action.data.slug);

      coin.visibility = !coin.visibility;

      settings.set('coins', coins);

      return { ...state, coins };
    }
    case SETTINGS_SAVE_ALERT_SUCCESS:
      return { ...state, alertsSettings: settings.get('alerts') };
    case SETTINGS_SAVE_COIN_SUCCESS:
      return { ...state, coins: settings.get('coins') };
    case SETTINGS_REMOVE_COIN_SUCCESS:
      return { ...state, coins: settings.get('coins') };
    case GET_COINS_SUCCESS:
      return { ...state, data: action.response };
    case GET_SYMBOL_LIST_SUCCESS:
      return { ...state, symbols: action.response };
    case FORCE_REFRESH_TOGGLE:
      return { ...state, forceRefresh: !state.forceRefresh };
    case GET_COIN_PRICE_SUCCESS: {
      const coins = cloneDeep(state.coins);
      const previousCoins = cloneDeep(state.coins);
      const coin = find(coins, (c) => c.slug === action.data.slug);
      const previousCoin = find(
        state.previousCoins,
        (c) => c.slug === action.data.slug
      );

      if (!coin) {
        return { ...state };
      }

      coin.price = map(action.response).join('');

      if (previousCoin && coin.price < previousCoin.price) {
        coin.trend = ETrend.LOWER;
      } else if (previousCoin && coin.price > previousCoin.price) {
        coin.trend = ETrend.HIGHER;
      } else {
        coin.trend = '';
      }

      console.log('aaaaaa', coins)
      window.api.ipcRenderer.trayUpdate(coins);

      const response = { ...state, coins, previousCoins, alerts: state.alerts };

      // ------------------------------------------------------------------------------------------------------Alert
      const alerts = cloneDeep(state.alerts);

      const alertSetting = find(
        state.alertsSettings,
        (a) => a.slug === action.data.slug
      );
      if (!alertSetting) {
        return response;
      }

      if (!alerts[action.data.slug]) {
        alerts[action.data.slug] = null;
      }

      alerts[action.data.slug] = coin.price;

      response.alerts = alerts;

      let isAlerted = false;
      if (alertSetting.trend === 'down' && coin.price < alertSetting.price) {
        window.api.ipcRenderer.notification({
          type: 'alert',
          title: coin.slug,
          body: `Price is lower than ${coin.price}`,
        });

        isAlerted = true;
      } else if (
        alertSetting.trend === 'up' &&
        coin.price > alertSetting.price
      ) {
        window.api.ipcRenderer.notification({
          type: 'alert',
          title: coin.slug,
          body: `Price is greater than ${coin.price}`,
        });
        isAlerted = true;
      }

      if (isAlerted) {
        const index = findIndex(
          state.alertsSettings,
          (s) => s.slug === coin.slug
        );
        state.alertsSettings.splice(index, 1);

        settings.set('alerts', state.alertsSettings);
      }

      return response;
    }
    default:
      return state;
  }
}
