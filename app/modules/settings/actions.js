import settings from 'electron-settings';
import { findIndex, find, forEach } from 'lodash';

export const SETTINGS_SAVE_COIN = 'SETTINGS_SAVE_COIN';
export const SETTINGS_SAVE_COIN_FAILED = 'SETTINGS_SAVE_COIN_FAILED';
export function saveCoinSettings(coin) {
  if (!settings.has('coins')) {
    settings.set('coins', []);
  }
  const coins = settings.get('coins');

  if (find(coins, (c) => c.Id === coin.Id)) {
    return (dispatch) => {
      dispatch({ type: SETTINGS_SAVE_COIN_FAILED });
    };
  }

  coins.push(coin);
  settings.set('coins', coins);

  return (dispatch) => {
    dispatch({ type: SETTINGS_SAVE_COIN });
  };
}

export const SETTINGS_REMOVE_COIN = 'SETTINGS_REMOVE_COIN';
export const SETTINGS_REMOVE_COIN_FAILED = 'SETTINGS_REMOVE_COIN_FAILED';
export function removeCoinSettings({ Id }) {
  const coins = settings.get('coins');
  const index = findIndex(coins, (c) => c.Id === Id);
  if (index === -1) {
    return (dispatch) => {
      dispatch({ type: SETTINGS_REMOVE_COIN_FAILED });
    };
  }

  coins.splice(index, 1);

  settings.set('coins', coins);

  return (dispatch) => {
    dispatch({ type: SETTINGS_REMOVE_COIN });
  };
}

export const SETTINGS_MAIN_UPDATE = 'SETTINGS_MAIN_UPDATE';
export function updateMainSettings(data) {
  forEach(data, (value, key) => {
    settings.set(key, value);
  });

  return (dispatch) => {
    dispatch({ type: SETTINGS_MAIN_UPDATE });
  };
}
