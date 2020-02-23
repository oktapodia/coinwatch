/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow } from 'electron';
import log from 'electron-log';
import path from 'path';
import electronDebug from 'electron-debug';
import module from 'module';
import { isDarwin } from './helpers/env';

import AutoUpdater from './main/AutoUpdater';
import AutoLaunch from './main/AutoLaunch';
import NotificationCenter from './main/NotificationCenter';
import Tray from './main/Tray';
import Menu from './main/menu';
import installExtensions from './helpers/devTools';
import Migrate from './modules/settings/Migrate';

log.debug('App starting...');

let mainWindow: BrowserWindow | null = null;

let isQuitting = false;

function setQuitState(state) {
  isQuitting = state;
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const createWindow = async () => {
  await new Migrate(); // eslint-disable-line no-new

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: true,
    center: true,
    width: 550,
    height: 600,
    minHeight: 550,
    minWidth: 600,
    fullscreenable: false,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
          nodeIntegration: true
        }
        : {
          preload: path.join(__dirname, 'dist/renderer.prod.js')
        }
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);

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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  const notificationCenter = new NotificationCenter(); // eslint-disable-line no-new
  new AutoLaunch(); // eslint-disable-line no-new
  new AutoUpdater(setQuitState); // eslint-disable-line no-new
  new Menu(mainWindow); // eslint-disable-line no-new
  new Tray(mainWindow, notificationCenter); // eslint-disable-line no-new

  /*  mainWindow.on('closed', () => {
      mainWindow = null;
    });
    */
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (!isDarwin) {
    app.quit();
  }
});

app.on('before-quit', () => {
  console.log('CALLED beforequit');
  setQuitState(true);
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
