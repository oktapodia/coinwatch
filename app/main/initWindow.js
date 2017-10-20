import { BrowserWindow } from 'electron';

export default function initWindow() {
  const defaults = {
    width: 500,
    height: 600,
    minHeight: 300,
    minWidth: 500,
    show: false,
    center: true,
    fullscreenable: false,
    webPreferences: {
      overlayScrollbars: true,
    },
  };

  const basePath = __dirname + (process.env.NODE_ENV === 'development' ? '/..' : '');

  const appWindow = new BrowserWindow(defaults);
  appWindow.loadURL(`file://${basePath}/windows/main/main.html`);
  appWindow.show();
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    appWindow.openDevTools();
  }

  return appWindow;
}
