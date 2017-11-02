import settings from 'electron-settings';
import { find, findIndex } from 'lodash';
import { CALL_HANDLER } from '../../middleware/handler';
import { getCoinListApi, getCoinPriceApi, getExchangeListApi, getSymbolListApi } from '../../connectors/cryptocompare/api';
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
      types: [GET_COIN_PRICE_ATTEMPT, GET_COIN_PRICE_SUCCESS, GET_COIN_PRICE_FAILURE],
      handler: getCoinPriceApi,
      data: coin,
    },
  };
}

export const GET_EXCHANGE_LIST_ATTEMPT = 'GET_EXCHANGE_LIST_ATTEMPT';
export const GET_EXCHANGE_LIST_SUCCESS = 'GET_EXCHANGE_LIST_SUCCESS';
export const GET_EXCHANGE_LIST_FAILURE = 'GET_EXCHANGE_LIST_FAILURE';

export function getExchangeList() {
  return {
    [CALL_HANDLER]: {
      types: [GET_EXCHANGE_LIST_ATTEMPT, GET_EXCHANGE_LIST_SUCCESS, GET_EXCHANGE_LIST_FAILURE],
      handler: getExchangeListApi,
    },
  };
}

export const GET_SYMBOL_LIST_ATTEMPT = 'GET_SYMBOL_LIST_ATTEMPT';
export const GET_SYMBOL_LIST_SUCCESS = 'GET_SYMBOL_LIST_SUCCESS';
export const GET_SYMBOL_LIST_FAILURE = 'GET_SYMBOL_LIST_FAILURE';

export function getSymbolList() {
  return {
    [CALL_HANDLER]: {
      types: [GET_SYMBOL_LIST_ATTEMPT, GET_SYMBOL_LIST_SUCCESS, GET_SYMBOL_LIST_FAILURE],
      handler: getSymbolListApi,
    },
  };
}

export const SETTINGS_SAVE_COIN_ATTEMPT = 'SETTINGS_SAVE_COIN_ATTEMPT';
export const SETTINGS_SAVE_COIN_SUCCESS = 'SETTINGS_SAVE_COIN_SUCCESS';
export const SETTINGS_SAVE_COIN_FAILED = 'SETTINGS_SAVE_COIN_FAILED';

export function saveCoin(coin) {
  return (dispatch) => {
    dispatch({ type: SETTINGS_SAVE_COIN_ATTEMPT });

    if (!settings.has('coins')) {
      settings.set('coins', []);
    }

    // eslint-disable-next-line
    coin.slug = generateSlug(coin.coin.Symbol, coin.to, coin.exchange);

    const coins = settings.get('coins');

    if (find(coins, (c) => c.slug === coin.slug)) {
      return dispatch({ type: SETTINGS_SAVE_COIN_FAILED });
    }

    // eslint-disable-next-line
    coin.visibility = false;

    coins.push(coin);
    settings.set('coins', coins);

    return dispatch({ type: SETTINGS_SAVE_COIN_SUCCESS });
  };
}

export const SETTINGS_REMOVE_COIN_ATTEMPT = 'SETTINGS_REMOVE_COIN_ATTEMPT';
export const SETTINGS_REMOVE_COIN_SUCCESS = 'SETTINGS_REMOVE_COIN_SUCCESS';
export const SETTINGS_REMOVE_COIN_FAILED = 'SETTINGS_REMOVE_COIN_FAILED';

export function removeCoin(slug) {
  return (dispatch) => {
    dispatch({ type: SETTINGS_REMOVE_COIN_ATTEMPT });

    const coins = settings.get('coins');
    const index = findIndex(coins, (c) => c.slug === slug);
    if (index === -1) {
      return dispatch({ type: SETTINGS_REMOVE_COIN_FAILED });
    }

    coins.splice(index, 1);

    settings.set('coins', coins);

    return dispatch({ type: SETTINGS_REMOVE_COIN_SUCCESS });
  };
}

export const SETTINGS_TOGGLE_VISIBILITY_SUCCESS = 'SETTINGS_TOGGLE_VISIBILITY_SUCCESS';

export function toggleVisibility(slug) {
  return (dispatch) => dispatch({ type: SETTINGS_TOGGLE_VISIBILITY_SUCCESS, data: { slug } });
}

export const FORCE_REFRESH_TOGGLE = 'FORCE_REFRESH_TOGGLE';

export function toggleForceRefresh() {
  return (dispatch) => dispatch({ type: FORCE_REFRESH_TOGGLE });
}
