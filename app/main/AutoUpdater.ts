import { dialog, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

class AutoUpdater {
  autoUpdater = null;
  setQuitState = null;

  constructor(setQuitState) {
    this.setQuitState = setQuitState;
    this.autoUpdater = autoUpdater;
    this.autoUpdater.logger = log;
    this.autoUpdater.logger.transports.file.level = 'info';

    this.autoUpdater.on('checking-for-update', this.constructor.onCheckingForUpdate);
    this.autoUpdater.on('error', this.constructor.onError);
    this.autoUpdater.on('download-progress', this.constructor.onDownloadProgress);
    this.autoUpdater.on('update-downloaded', ::this.onUpdateDownloaded);
    this.autoUpdater.on('update-available', ::this.onUpdateAvailable);
    this.autoUpdater.on('update-not-available', ::this.onUpdateNotAvailable);

    ipcMain.on('check-update', ::this.checkForUpdates);
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
      message:
        'You already have the latest version available',
    });
  }

  static onError(err) {
    log.debug('error');
    log.debug(err);
  }

  static onDownloadProgress(info) {
    log.debug('onDownloadProgress');
    log.debug('Update not available.');
    log.debug(info);
  }

  onUpdateDownloaded(info) {
    log.debug('onUpdateDownloaded');
    log.debug('Update downloaded;');

    log.debug(info);

    this.displayQuitAndInstallDialog();
  }

  onUpdateAvailable(info) {
    log.debug('onUpdateAvailable');
    log.debug('Update available.');
    log.debug(info);
    this.constructor.displayUpdateAvailableDialog();
  }

  onUpdateNotAvailable(info) {
    log.debug('onUpdateNotAvailable');
    log.debug('Update not available.');
    log.debug(info);

    this.constructor.displayNoUpdateAvailableDialog();
  }

  static displayUpdateAvailableDialog() {
    dialog.showMessageBox({
      type: 'info',
      buttons: ['OK'],
      title: 'Update Available',
      message: 'Please wait until CoinWatch download the new version and ask you for install it.',
    });
  }
  displayQuitAndInstallDialog() {
    dialog.showMessageBox(
      {
        type: 'question',
        buttons: ['Update & Restart', 'Cancel'],
        title: 'Update Available',
        cancelId: 99,
        message:
          'New version ready to install. Would you like to update CoinWatch now?',
      },
      response => {
        console.log(`Exit: ${response}`); // eslint-disable-line no-console

        if (response === 0) {
          this.setQuitState(true);
          autoUpdater.quitAndInstall();
        }
      },
    );
  }

  checkForUpdates() {
    if (process.env.NODE_ENV === 'development') {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['Ok'],
        title: 'Development env',
        message:
          'Not available in dev mode',
      });
      return;
    }

    log.debug('checkForUpdates triggered');
    this.autoUpdater.checkForUpdates();
  }
}

export default AutoUpdater;
