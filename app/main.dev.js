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
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import path from 'path';
import { map } from 'lodash';
import packageJson from '../package.json';
import { isDarwin, isWindows } from './helpers/env';


autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  console.log(name);
  console.log(name);
  console.log(name);
  console.log(name);
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

/*
function sendStatusToWindow(text) {
  log.info(text);
  aboutWindow.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
});
*/


autoUpdater.on('update-downloaded', (info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  autoUpdater.quitAndInstall();
});




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
  tray.on('click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('right-click', toggleWindow);

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle window',
      click() {
        toggleWindow();
      },
    },
    {
      label: 'About',
      click() {
        if (!isWindows) {
          let aboutWindow = new BrowserWindow({ width: 200, height: 200, show: false, autoHideMenuBar: true, resizable: true });
          aboutWindow.on("closed", () => {
            aboutWindow = null;
          });

          // Load a remote URL
          aboutWindow.loadURL(`file://${__dirname}/about/about.html`);

          aboutWindow.once('ready-to-show', () => {
            aboutWindow.webContents.send('get-version', packageJson.version);
            aboutWindow.show();
          });
        }
      }
    },
    {
      type: 'separator',
    },
    {
      label: 'Quit',
      accelerator: isDarwin ? 'Command+Q' : 'Alt+F4',
      role: 'quit',
    },
  ]);

  tray.setContextMenu(trayMenu);
}

function toggleWindow() {
  if (appWindow.isVisible()) {
    appWindow.hide();
    return;
  }

  appWindow.show();
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
  autoUpdater.checkForUpdates();

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  ipcMain.on('tray-update', (event, prices) => {
    console.log('IPCMAINUPDATE', prices);

    const trayDisplay = map(prices, (price, coinName) => {
      return `${coinName}: $${price.USD}`;
    });

    tray.setTitle(trayDisplay.join(' | '));
  });
});
