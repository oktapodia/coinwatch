import { BrowserWindow, Tray as TrayElectron, ipcMain } from 'electron';
import path from 'path';
import { map } from 'lodash';
import TrayMenu from './TrayMenu';

class Tray {
  tray = null;
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;

    this.onTrayUpdate = this.onTrayUpdate.bind(this);
    this.init();
  }

  init() {
    const basePath = __dirname + (process.env.NODE_ENV === 'development' ? '/../' : '/dist/');
    this.tray = new TrayElectron(path.join(basePath, 'appIcon.png'));

    const trayMenu = new TrayMenu(this, this.autoUpdater);
    this.tray.setContextMenu(trayMenu.getMenu());
    this.registerHandlers();
  }

  toggleWindow() {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
      return;
    }

    this.mainWindow.show();
  }

  registerHandlers() {
    this.tray.on('click', this.toggleWindow);
    this.tray.on('double-click', this.toggleWindow);
    this.tray.on('right-click', this.toggleWindow);

    ipcMain.on('tray-update', this.onTrayUpdate);
  }

  onTrayUpdate(event, prices) {
    console.log('IPCMAINUPDATE', prices);

    const trayDisplay = map(prices, (price, coinName) => {
      return `${coinName}: ${price}`;
    });

    this.tray.setTitle(trayDisplay.join(' | '));
  }
}

export default Tray;
