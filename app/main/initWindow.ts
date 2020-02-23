import { BrowserWindow } from 'electron';
import path from 'path';

export default function initWindow() {
  const defaults = {
    width: 550,
    height: 600,
    minHeight: 550,
    minWidth: 600,
    show: true,
    center: true,
    fullscreenable: false,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true,
            overlayScrollbars: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  };

  const basePath = path.join(
    __dirname,
    process.env.NODE_ENV === 'development' ? '/..' : ''
  );

  const appWindow = new BrowserWindow(defaults);

  appWindow.loadURL(`file://${__dirname}/../windows/main/main.html`);

  // appWindow.loadURL(`file://${basePath}/windows/main/main.html`);
  // appWindow.show();
  // if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  //   appWindow.openDevTools();
  // }

  appWindow.webContents.on('did-finish-load', () => {
    if (!appWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      appWindow.minimize();
    } else {
      appWindow.show();
      appWindow.focus();
      // if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      //   appWindow.openDevTools();
      // }
    }
  });

  return appWindow;
}

/*

mainWindow.loadURL(`file://${__dirname}/app.html`);

// @TODO: Use 'ready-to-show' event
//        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
mainWindow.webContents.on('did-finish-load', () => {
  if (!mainWindow) {
    throw new Error('"mainWindow" is not defined');
  }
  if (process.env.START_MINIMIZED) {
    mainWindow.minimize();
  } else {
    mainWindow.show();
    mainWindow.focus();
  }
});
*/
