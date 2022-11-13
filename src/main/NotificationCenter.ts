import { ipcMain, Notification } from 'electron';

export const NOTIFICATION = 'notification';

class NotificationCenter {
  constructor() {
    this.init();
  }

  init() {
    // this.tray = new TrayElectron(path.join(__dirname, process.env.NODE_ENV === 'development' ? '/../' : '/dist/', 'appIcon.png'));
    //
    // const trayMenu = new TrayMenu(this, this.autoUpdater);
    // this.tray.setContextMenu(trayMenu.getMenu());
    this.registerHandlers();
  }

  // eslint-disable-next-line class-methods-use-this
  registerHandlers() {
    // this.tray.on('click', this.toggleWindow);
    // this.tray.on('double-click', this.toggleWindow);
    // this.tray.on('right-click', this.toggleWindow);

    ipcMain.on(NOTIFICATION, NotificationCenter.onNotificationReceive);
  }

  static onNotificationReceive(_event: any, notification: any) {
    console.log('NOTIFICATION TRIGGERED');
    switch (notification.type) {
      case 'alert': {
        const notif = new Notification(notification);

        notif.show();

        break;
      }
      default:
        break;
    }
  }
}

export default NotificationCenter;
