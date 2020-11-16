import { BrowserWindow, ipcMain, Tray as TrayElectron } from 'electron';
import path from 'path';
import { filter, map } from 'lodash';
import TrayMenu from './TrayMenu';
import formatPrice from '../helpers/formatPrice';

export const TRAY_UPDATE = 'tray-update';

class Tray {
  tray = null;
  mainWindow: BrowserWindow;
  notificationCenter;

  constructor(mainWindow, notificationCenter) {
    this.mainWindow = mainWindow;
    this.notificationCenter = notificationCenter;

    this.onTrayUpdate = ::this.onTrayUpdate;
    this.init();
  }

  init() {
    this.tray = new TrayElectron(path.join(__dirname, process.env.NODE_ENV === 'development' ? '../../resources' : '/../resources/', 'icon_16@2x.png'));

    const trayMenu = new TrayMenu(this, this.autoUpdater);
    this.tray.setContextMenu(trayMenu.getMenu());
    this.registerHandlers();
  }

  registerHandlers() {
    ipcMain.on(TRAY_UPDATE, this.onTrayUpdate);
  }

  onTrayUpdate(event, coins) {
    const coinsFiltered = filter(coins, 'visibility');

    if (!coinsFiltered) {
      return;
    }

    const trayDisplay = map(coinsFiltered, ({ coin, to, trend, price }) => `${coin.symbol}: ${formatPrice(price, to)} ${trend}`);

    this.tray.setTitle(trayDisplay.join(' | '));
  }
}

export default Tray;
