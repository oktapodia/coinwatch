import { BrowserWindow, Tray as TrayElectron, ipcMain } from 'electron';
import path from 'path';
import { map, filter } from 'lodash';
import TrayMenu from './TrayMenu';

export const TRAY_UPDATE = 'tray-update';

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

    ipcMain.on(TRAY_UPDATE, this.onTrayUpdate);
  }

  onTrayUpdate(event, coins) {
    console.log('IPCMAINUPDATE', coins);

    const coinsFiltered = filter(coins, 'visibility');
    if (!coinsFiltered) {
      return;
    }

    console.log('UPDATED');

    const trayDisplay = map(coinsFiltered, ({ coin, price }) => {
      return `${coin.Symbol}: ${price}`;
    });

    this.tray.setTitle(trayDisplay.join(' | '));
  }
}

export default Tray;
