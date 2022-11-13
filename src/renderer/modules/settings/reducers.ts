import { SETTINGS_AUTOLAUNCH_OFF, SETTINGS_AUTOLAUNCH_ON } from './actions';

const defaultSettings = {
  decimal: 4,
  autoLaunch: false,
};

export default async function settingsReducer(
  state = defaultSettings,
  action: any
) {

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
