import { BrowserWindow } from 'electron';
import path from 'path';

export default function initWindow() {
  const defaults = {
    width: 510,
    height: 560,
    minHeight: 510,
    minWidth: 560,
    show: false,
    center: true,
    fullscreenable: false,
    webPreferences: {
      overlayScrollbars: true,
    },
  };

  const basePath = path.join(__dirname, process.env.NODE_ENV === 'development' ? '/..' : '');

  const appWindow = new BrowserWindow(defaults);
  appWindow.loadURL(`file://${basePath}/windows/main/main.html`);
  appWindow.show();
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    appWindow.openDevTools();
  }

  return appWindow;
}
