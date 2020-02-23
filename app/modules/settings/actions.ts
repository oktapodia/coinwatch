import settings from 'electron-settings';
import { forEach } from 'lodash';

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
  if (data === 'yes') {
    return (dispatch) => {
      dispatch({ type: SETTINGS_AUTOLAUNCH_ON });
    };
  }

  return (dispatch) => {
    dispatch({ type: SETTINGS_AUTOLAUNCH_OFF });
  };
}
