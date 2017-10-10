// @flow

import { CALL_HANDLER } from '../../middleware/handler';
import { getCoinListApi, getCoinPriceApi } from '../../connectors/cryptocompare/api';

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
      data: coin.Symbol,
    },
  };
}
