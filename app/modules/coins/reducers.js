// @flow

import { cloneDeep } from 'lodash';
import { ipcRenderer } from 'electron';
import { GET_COINS_SUCCESS, GET_COIN_PRICE_SUCCESS } from './actions';
import { SETTINGS_REMOVE_COIN } from '../settings/actions';

const initialState = {
  prices: {},
  data: [],
};

export default function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_REMOVE_COIN:
      return { ...state, prices: {} };
      break;
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
