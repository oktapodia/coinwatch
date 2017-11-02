import settings from 'electron-settings';
import { assign } from 'lodash';
import { ipcRenderer } from 'electron';
import { SETTINGS_AUTOLAUNCH_OFF, SETTINGS_AUTOLAUNCH_ON, } from './actions';

const defaultSettings = {
  decimal: 4,
};
const initialState = assign(defaultSettings, settings.getAll());

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_AUTOLAUNCH_ON:
      ipcRenderer.send('autolaunch-on');

      return state;
    case SETTINGS_AUTOLAUNCH_OFF:
      ipcRenderer.send('autolaunch-off');

      return state;
    default:
      return state;
  }
}
