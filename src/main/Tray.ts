import { BrowserWindow, ipcMain, Tray as TrayElectron } from 'electron';
import path from 'path';
import { app } from 'electron';
import { filter, map } from 'lodash';
// eslint-disable-next-line import/no-cycle
import TrayMenu from './TrayMenu';
import formatPrice from './helpers/formatPrice';
import NotificationCenter from './NotificationCenter';
import ICoin from '../types/ICoin';

const EXTRA_RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'resources')
  : path.join(__dirname, '../../resources');  // Your relative path may be different!

const getAssetPath = (resourceFilename: string): string => {
  return path.join(EXTRA_RESOURCES_PATH, resourceFilename);
};


export const TRAY_UPDATE = 'tray-update';

class Tray {
  tray = new TrayElectron(
    getAssetPath('icon_16@2x.png')
  );

  mainWindow: BrowserWindow;

  notificationCenter: NotificationCenter;

  constructor(
    mainWindow: BrowserWindow,
    notificationCenter: NotificationCenter
  ) {
    this.mainWindow = mainWindow;
    this.notificationCenter = notificationCenter;

    this.init();
  }

  init = () => {
    const trayMenu = new TrayMenu(this);
    this.tray.setContextMenu(trayMenu.getMenu());
    this.registerHandlers();
  };

  registerHandlers = () => {
    ipcMain.on(TRAY_UPDATE, this.onTrayUpdate);
  };

  onTrayUpdate = (_event: any, coins: ICoin[]) => {
    const coinsFiltered = filter(coins, 'visibility');

    if (!coinsFiltered) {
      return;
    }

    console.log('filtered', coinsFiltered)

    const trayDisplay = map(
      coinsFiltered,
      ({ coin, to, trend, price }) => {
        console.log('ss', coin, to, trend, price, `${coin.symbol}: ${formatPrice(price, to)} ${trend}`)
        return`${coin.symbol}: ${formatPrice(price, to)} ${trend}`
      }
    );

    console.log('trayD', trayDisplay)

    this.tray.setTitle(trayDisplay.join(' | '));
  };
}

export default Tray;
