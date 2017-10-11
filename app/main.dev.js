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
import { app, BrowserWindow, Tray, ipcMain, Menu } from 'electron';
import path from 'path';
import { map } from 'lodash';
import { isDarwin } from './helpers/env';

let appWindow = null;
let tray = null;
let isQuitting = false;

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});




function createTray() {
  tray = new Tray(path.join(__dirname, 'dist', 'appIcon.png'));
}

function initWindow() {
  const defaults = {
    width: 500,
    height: 600,
    minHeight: 300,
    minWidth: 500,
    show: false,
    center: true,
    fullscreenable: false,
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      overlayScrollbars: true,
    },
  };

  appWindow = new BrowserWindow(defaults);
  appWindow.loadURL(`file://${__dirname}/index.html`);
  appWindow.show();
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    appWindow.openDevTools();
  }

  appWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      appWindow.hide();
    }
  });

/*  const menu = Menu.buildFromTemplate(appMenuTemplate);
  Menu.setApplicationMenu(menu);
  checkAutoUpdate(false);*/
}


app.on('before-quit', () => {
  isQuitting = true;
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  createTray();
  initWindow();

  ipcMain.on('tray-update', (event, prices) => {
    console.log('IPCMAINUPDATE', prices);

    const trayDisplay = map(prices, (price, coinName) => {
      return `${coinName}: $${price.USD}`;
    });

    tray.setTitle(trayDisplay.join(' | '));
  });
});
