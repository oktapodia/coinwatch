import settings from 'electron-settings';
import { find, findIndex } from 'lodash';
import { Dispatch } from 'redux';
import { CALL_HANDLER } from '../../middleware/handler';
import {
  getCoinListApi,
  getCoinPriceApi,
  getSymbolListApi,
} from '../../connectors/coinpaprika/api';
import { generateSlug } from './helpers';

export const GET_COINS_ATTEMPT = 'GET_COINS_ATTEMPT';
export const GET_COINS_SUCCESS = 'GET_COINS_SUCCESS';
export const GET_COINS_FAILURE = 'GET_COINS_FAILURE';

export function getCoins() {
  return {
    [CALL_HANDLER]: {
      types: [GET_COINS_ATTEMPT, GET_COINS_SUCCESS, GET_COINS_FAILURE],
      handler: getCoinListApi,
    },
  };
}

export const GET_COIN_PRICE_ATTEMPT = 'GET_COIN_PRICE_ATTEMPT';
export const GET_COIN_PRICE_SUCCESS = 'GET_COIN_PRICE_SUCCESS';
export const GET_COIN_PRICE_FAILURE = 'GET_COIN_PRICE_FAILURE';

export function getCoinPrice(coin) {
  return {
    [CALL_HANDLER]: {
      types: [
        GET_COIN_PRICE_ATTEMPT,
        GET_COIN_PRICE_SUCCESS,
        GET_COIN_PRICE_FAILURE,
      ],
      handler: (coin) => getCoinPriceApi(coin),
      data: coin,
    },
  };
}

export const GET_SYMBOL_LIST_ATTEMPT = 'GET_SYMBOL_LIST_ATTEMPT';
export const GET_SYMBOL_LIST_SUCCESS = 'GET_SYMBOL_LIST_SUCCESS';
export const GET_SYMBOL_LIST_FAILURE = 'GET_SYMBOL_LIST_FAILURE';

export function getSymbolList() {
  return {
    [CALL_HANDLER]: {
      types: [
        GET_SYMBOL_LIST_ATTEMPT,
        GET_SYMBOL_LIST_SUCCESS,
        GET_SYMBOL_LIST_FAILURE,
      ],
      handler: getSymbolListApi,
    },
  };
}

export const SETTINGS_SAVE_COIN_ATTEMPT = 'SETTINGS_SAVE_COIN_ATTEMPT';
export const SETTINGS_SAVE_COIN_SUCCESS = 'SETTINGS_SAVE_COIN_SUCCESS';
export const SETTINGS_SAVE_COIN_FAILED = 'SETTINGS_SAVE_COIN_FAILED';

export function saveCoin(coin) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SETTINGS_SAVE_COIN_ATTEMPT });

    if (!(await settings.has('coins'))) {
      await settings.set('coins', []);
    }

    // eslint-disable-next-line
    coin.slug = generateSlug(coin.coin.symbol, coin.to, coin.exchange);

    const coins = await settings.get('coins');
    if (find(coins, (c) => c.slug === coin.slug)) {
      return dispatch({ type: SETTINGS_SAVE_COIN_FAILED });
    }

    // eslint-disable-next-line
    coin.visibility = true;

    coins.push(coin);
    await settings.set('coins', coins);

    return dispatch({ type: SETTINGS_SAVE_COIN_SUCCESS });
  };
}

export const SETTINGS_SAVE_ALERT_ATTEMPT = 'SETTINGS_SAVE_ALERT_ATTEMPT';
export const SETTINGS_SAVE_ALERT_SUCCESS = 'SETTINGS_SAVE_ALERT_SUCCESS';
export const SETTINGS_SAVE_ALERT_FAILED = 'SETTINGS_SAVE_ALERT_FAILED';

export function saveAlert(alert) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SETTINGS_SAVE_ALERT_ATTEMPT });

    const alerts = await settings.get('alerts');

    alerts[alert.slug] = alert;

    const index = findIndex(alerts, (c) => c.slug === alert.slug);
    if (index !== -1) {
      alerts.splice(index, 1);
    }

    alerts.push(alert);

    console.log('updated', alerts);

    await settings.set('alerts', alerts);

    return dispatch({ type: SETTINGS_SAVE_ALERT_SUCCESS });
  };
}

export const SETTINGS_REMOVE_COIN_ATTEMPT = 'SETTINGS_REMOVE_COIN_ATTEMPT';
export const SETTINGS_REMOVE_COIN_SUCCESS = 'SETTINGS_REMOVE_COIN_SUCCESS';
export const SETTINGS_REMOVE_COIN_FAILED = 'SETTINGS_REMOVE_COIN_FAILED';

export function removeCoin(slug) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SETTINGS_REMOVE_COIN_ATTEMPT });

    const coins = await settings.get('coins');
    const index = findIndex(coins, (c) => c.slug === slug);
    if (index === -1) {
      return dispatch({ type: SETTINGS_REMOVE_COIN_FAILED });
    }

    coins.splice(index, 1);

    await settings.set('coins', coins);

    return dispatch({ type: SETTINGS_REMOVE_COIN_SUCCESS });
  };
}

export const SETTINGS_TOGGLE_VISIBILITY_SUCCESS =
  'SETTINGS_TOGGLE_VISIBILITY_SUCCESS';

export function toggleVisibility(slug: string) {
  return (dispatch: Dispatch) =>
    dispatch({ type: SETTINGS_TOGGLE_VISIBILITY_SUCCESS, data: { slug } });
}

export const FORCE_REFRESH_TOGGLE = 'FORCE_REFRESH_TOGGLE';

export function toggleForceRefresh() {
  return (dispatch: Dispatch) => dispatch({ type: FORCE_REFRESH_TOGGLE });
}
