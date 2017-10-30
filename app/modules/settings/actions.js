import settings from 'electron-settings';
import { findIndex, find, forEach } from 'lodash';

export const SETTINGS_SAVE_COIN_ATTEMPT = 'SETTINGS_SAVE_COIN_ATTEMPT';
export const SETTINGS_SAVE_COIN_SUCCESS = 'SETTINGS_SAVE_COIN_SUCCESS';
export const SETTINGS_SAVE_COIN_FAILED = 'SETTINGS_SAVE_COIN_FAILED';
export function saveCoinSettings(coin) {
  return (dispatch) => {
    dispatch({ type: SETTINGS_SAVE_COIN_ATTEMPT });

    if (!settings.has('coins')) {
      settings.set('coins', []);
    }
    const coins = settings.get('coins');

    if (find(coins, (c) => c.coin.Id === coin.coin.Id)) {
      return dispatch({ type: SETTINGS_SAVE_COIN_FAILED });
    }

    coins.push(coin);
    settings.set('coins', coins);

    return dispatch({ type: SETTINGS_SAVE_COIN_SUCCESS });
  }
}

export const SETTINGS_REMOVE_COIN_ATTEMPT = 'SETTINGS_REMOVE_COIN_ATTEMPT';
export const SETTINGS_REMOVE_COIN_SUCCESS = 'SETTINGS_REMOVE_COIN_SUCCESS';
export const SETTINGS_REMOVE_COIN_FAILED = 'SETTINGS_REMOVE_COIN_FAILED';
export function removeCoinSettings({ Id }) {
  return (dispatch) => {
    dispatch({ type: SETTINGS_REMOVE_COIN_ATTEMPT });

    const coins = settings.get('coins');
    const index = findIndex(coins, (c) => c.coin.Id === Id);
    if (index === -1) {
      return dispatch({ type: SETTINGS_REMOVE_COIN_FAILED });
    }

    coins.splice(index, 1);

    settings.set('coins', coins);

    return dispatch({ type: SETTINGS_REMOVE_COIN_SUCCESS });
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

export const SETTINGS_AUTOLAUNCH_ON = 'SETTINGS_AUTOLAUNCH_ON';
export const SETTINGS_AUTOLAUNCH_OFF = 'SETTINGS_AUTOLAUNCH_OFF';
export function updateAutolaunchSettings(data) {
  if (data === "yes") {
    return (dispatch) => {
      dispatch({ type: SETTINGS_AUTOLAUNCH_ON });
    };
  }

  return (dispatch) => {
    dispatch({ type: SETTINGS_AUTOLAUNCH_OFF });
  };
}
