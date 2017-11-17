import { ipcMain, Tray as TrayElectron } from 'electron';
import path from 'path';
import { filter, map } from 'lodash';
import TrayMenu from './TrayMenu';
import formatPrice from '../helpers/formatPrice';
import trendToArrow from '../helpers/trendToArrow';

export const TRAY_UPDATE = 'tray-update';

class Tray {
  tray = null;
  mainWindow;

  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    this.onTrayUpdate = ::this.onTrayUpdate;
    this.init();
  }

  init() {
    this.tray = new TrayElectron(path.join(__dirname, process.env.NODE_ENV === 'development' ? '/../' : '/dist/', 'appIcon.png'));

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
    const coinsFiltered = filter(coins, 'visibility');
    if (!coinsFiltered) {
      return;
    }

    console.log('UPDATED');

    const trayDisplay = map(coinsFiltered, ({ coin, to, trend, price }) => {
      return `${trendToArrow(`${coin.Symbol}: ${formatPrice(price, to)}`, trend)}`;
    });

    this.tray.setTitle(trayDisplay.join(' | '));
  }
}

export default Tray;
