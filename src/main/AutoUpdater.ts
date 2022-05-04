import { dialog, ipcMain } from 'electron';
import { AppUpdater, autoUpdater } from 'electron-updater';
import log from 'electron-log';

class AutoUpdater {
  autoUpdater: AppUpdater = autoUpdater;

  setQuitState?: (state: boolean) => void;

  constructor(setQuitState: (state: boolean) => void) {
    this.setQuitState = setQuitState;

    log.transports.file.level = 'info';
    this.autoUpdater.logger = log;

    this.autoUpdater.on('checking-for-update', AutoUpdater.onCheckingForUpdate);
    this.autoUpdater.on('error', AutoUpdater.onError);
    this.autoUpdater.on('download-progress', AutoUpdater.onDownloadProgress);
    this.autoUpdater.on('update-downloaded', this.onUpdateDownloaded);
    this.autoUpdater.on('update-available', this.onUpdateAvailable);
    this.autoUpdater.on('update-not-available', this.onUpdateNotAvailable);

    ipcMain.on('check-update', this.checkForUpdates);
  }

  static onCheckingForUpdate() {
    log.debug('onCheckingForUpdate');
    log.debug('Checking for update...');
  }

  static displayNoUpdateAvailableDialog() {
    dialog.showMessageBox({
      type: 'info',
      buttons: ['Ok'],
      title: 'No update available',
      message: 'You already have the latest version available',
    });
  }

  static onError(err: Error) {
    log.debug('error');
    log.debug(err);
  }

  static onDownloadProgress(info: any) {
    log.debug('onDownloadProgress');
    log.debug('Update not available.');
    log.debug(info);
  }

  onUpdateDownloaded = (info: any) => {
    log.debug('onUpdateDownloaded');
    log.debug('Update downloaded;');

    log.debug(info);

    this.displayQuitAndInstallDialog();
  };

  onUpdateAvailable = (info: any) => {
    log.debug('onUpdateAvailable');
    log.debug('Update available.');
    log.debug(info);
    AutoUpdater.displayUpdateAvailableDialog();
  };

  onUpdateNotAvailable = (info: any) => {
    log.debug('onUpdateNotAvailable');
    log.debug('Update not available.');
    log.debug(info);

    AutoUpdater.displayNoUpdateAvailableDialog();
  };

  static displayUpdateAvailableDialog() {
    dialog.showMessageBox({
      type: 'info',
      buttons: ['OK'],
      title: 'Update Available',
      message:
        'Please wait until CoinWatch download the new version and ask you for install it.',
    });
  }

  displayQuitAndInstallDialog = async () => {
    const response = await dialog.showMessageBox({
      type: 'question',
      buttons: ['Update & Restart', 'Cancel'],
      title: 'Update Available',
      cancelId: 99,
      message:
        'New version ready to install. Would you like to update CoinWatch now?',
    });

    console.log(`Exit: ${response}`); // eslint-disable-line no-console

    if (response.response === 0 && this.setQuitState) {
      this.setQuitState(true);
      autoUpdater.quitAndInstall();
    }
  };

  checkForUpdates = () => {
    if (process.env.NODE_ENV === 'development') {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['Ok'],
        title: 'Development env',
        message: 'Not available in dev mode',
      });
      return;
    }

    log.debug('checkForUpdates triggered');
    this.autoUpdater.checkForUpdates();
  };
}

export default AutoUpdater;
