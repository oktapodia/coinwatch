import { assign } from 'lodash';
// import { ipcRenderer } from 'electron';
import settings from '../../utils/settings';
import { SETTINGS_AUTOLAUNCH_OFF, SETTINGS_AUTOLAUNCH_ON } from './actions';

const defaultSettings = {
  decimal: 4,
};

const initialState = assign(defaultSettings, settings.get() as any);

export default async function settingsReducer(
  state = initialState,
  action: any
) {
  // eslint-disable-next-line no-param-reassign
  state = assign(state, settings.get());

  switch (action.type) {
    case SETTINGS_AUTOLAUNCH_ON:
      window.api.ipcRenderer.autoLaunchOn();
      return state;
    case SETTINGS_AUTOLAUNCH_OFF:
      window.api.ipcRenderer.autoLaunchOff();

      return state;
    default:
      return state;
  }
}
