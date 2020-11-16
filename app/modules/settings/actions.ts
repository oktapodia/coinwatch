import settings from 'electron-settings';
import { Dispatch } from 'redux';
import { JsonObject } from '../../types/JsonValue';

export const SETTINGS_MAIN_UPDATE = 'SETTINGS_MAIN_UPDATE';

export async function updateMainSettings(data: JsonObject) {
  for (const key in data) {
    await settings.set(key, data[key]);
  }

  return (dispatch: Dispatch) => {
    dispatch({ type: SETTINGS_MAIN_UPDATE });
  };
}

export const SETTINGS_AUTOLAUNCH_ON = 'SETTINGS_AUTOLAUNCH_ON';
export const SETTINGS_AUTOLAUNCH_OFF = 'SETTINGS_AUTOLAUNCH_OFF';

export function updateAutolaunchSettings(data: string) {
  if (data === 'yes') {
    return (dispatch: Dispatch) => {
      dispatch({ type: SETTINGS_AUTOLAUNCH_ON });
    };
  }

  return (dispatch: Dispatch) => {
    dispatch({ type: SETTINGS_AUTOLAUNCH_OFF });
  };
}
