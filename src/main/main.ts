/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { app, BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log';
import path from 'path';
import { isDarwin } from './helpers/env';

import AutoUpdater from './AutoUpdater';
import AutoLaunch from './AutoLaunch';
import NotificationCenter from './NotificationCenter';
import Tray from './Tray';
import MenuBuilder from './menu';
import Settings from './settings/Settings';
import { resolveHtmlPath } from './util';

log.debug('App starting...');

let mainWindow: BrowserWindow | null = null;

let isQuitting = false;

function setQuitState(state: boolean) {
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

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const settings = new Settings();
  await settings.init();

  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });
  ipcMain.on('settings', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC SETTINGS: ${pingPong}`;
    console.log(msgTemplate(arg));

    event.returnValue = msgTemplate('tototes');

    event.reply('settings');
  });
  ipcMain.on('settings/get', async (event) => {
    console.log('SETTINGSGETFROMMAIN', settings.get(), await settings.get());

    const data = await settings.get();

    console.log('dat', data);
    event.reply('settings', data);
  });
  ipcMain.on('settings/set', async (event, settingsUpdated) => {
    await settings.set(settingsUpdated);
    event.reply('settings', await settings.get());
  });

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets') // TODO: Swapped from resources to assets
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: true,
    center: true,
    width: 550,
    height: 600,
    minHeight: 550,
    minWidth: 600,
    fullscreenable: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      // nodeIntegration: true,

      // nodeIntegration: true,
      // enableRemoteModule: true
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    console.log('Rady to show');

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

  mainWindow.on('close', (event) => {
    console.log('CLOSE');
    if (!isQuitting) {
      event.preventDefault();
      mainWindow!.hide();
    } else {
      mainWindow = null;
    }
  });

  const notificationCenter = new NotificationCenter();
  // eslint-disable-next-line no-new
  new AutoLaunch();

  // eslint-disable-next-line no-new
  new AutoUpdater(setQuitState);
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
  // eslint-disable-next-line no-new
  new Tray(mainWindow, notificationCenter);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  console.log('window all closed');
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

app.on('activate', () => {
  console.log('ACTIVATE');
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

app
  .whenReady()
  // eslint-disable-next-line promise/always-return
  .then(() => {
    createWindow();
  })
  .catch(console.log);
