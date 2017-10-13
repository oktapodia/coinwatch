/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app } from 'electron';
import log from 'electron-log';
import path from 'path';
import { isDarwin } from './helpers/env';

import initWindow from './main/initWindow';
import AutoUpdater from './main/AutoUpdater';
import Tray from './main/Tray';
import Menu from './main/menu';
import { installExtensions } from './helpers/devTools';

log.debug('App starting...');

let isQuitting = false;

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

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
  isQuitting = true;
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  const appWindow = initWindow();

  appWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      appWindow.hide();
    }
  });

  new Menu(appWindow);
  new Tray(appWindow);
  new AutoUpdater();

  // autoUpdater.checkForUpdates();
});
