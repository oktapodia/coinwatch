import { Dispatch } from 'redux';
import settings from '../../utils/settings';
import { JsonObject } from '../../../types/JsonValue';

export const SETTINGS_MAIN_UPDATE = 'SETTINGS_MAIN_UPDATE';

export async function updateMainSettings(data: JsonObject) {
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in data) {
    // eslint-disable-next-line no-await-in-loop
    await settings.set(key, data[key]);
  }

  return (dispatch: Dispatch) => {
    dispatch({ type: SETTINGS_MAIN_UPDATE });
  };
}

export const SETTINGS_AUTOLAUNCH_ON = 'SETTINGS_AUTOLAUNCH_ON';
export const SETTINGS_AUTOLAUNCH_OFF = 'SETTINGS_AUTOLAUNCH_OFF';

export function updateAutolaunchSettings(isOn: boolean) {
  return (dispatch: Dispatch) => {
    dispatch({ type: isOn ? SETTINGS_AUTOLAUNCH_ON : SETTINGS_AUTOLAUNCH_OFF });
  };
}
