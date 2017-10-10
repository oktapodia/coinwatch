// @flow

import { cloneDeep } from 'lodash';
import { ipcRenderer } from 'electron';
import { GET_COINS_SUCCESS, GET_COIN_PRICE_SUCCESS } from './actions';

const initialState = {
  prices: {},
  data: [],
};

export default function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COINS_SUCCESS:
      return { ...state, data: action.response };
      break;
    case GET_COIN_PRICE_SUCCESS:
      const prices = cloneDeep(state.prices);
      prices[action.data] = action.response;

      ipcRenderer.send('tray-update', prices);

      return { ...state, prices };
      break;
    default:
      return state;
  }
}
