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

    this.autoUpdater.on('update-downloaded', this.constructor.onUpdateDownloaded);
    this.autoUpdater.on('checking-for-update', this.constructor.onCheckingForUpdate);
    this.autoUpdater.on('error', this.constructor.onError);
    this.autoUpdater.on('download-progress', this.constructor.onDownloadProgress);
    this.autoUpdater.on('update-available', ::this.onUpdateAvailable);
    this.autoUpdater.on('update-not-available', ::this.onUpdateNotAvailable);

    ipcMain.on('check-update', ::this.checkForUpdates);
  }

  static onUpdateDownloaded(info) {
    log.debug('onUpdateDownloaded');
    log.debug('Update downloaded;');

    log.debug(info);
  }

  static onCheckingForUpdate() {
    log.debug('onCheckingForUpdate');
    log.debug('Checking for update...');

    // this.autoUpdater.quitAndInstall();
  }

  onUpdateAvailable(info) {
    log.debug('onUpdateAvailable');
    log.debug('Update available.');
    log.debug(info);
    this.displayUpdateAvailableDialog();
  }

  onUpdateNotAvailable(info) {
    log.debug('onUpdateNotAvailable');
    log.debug('Update not available.');
    log.debug(info);

    this.constructor.displayNoUpdateAvailableDialog();
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

  static displayNoUpdateAvailableDialog() {
    dialog.showMessageBox({
      type: 'info',
      buttons: ['Ok'],
      title: 'No update available',
      message:
        'You already have the latest version available',
    });
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

  displayUpdateAvailableDialog() {
    dialog.showMessageBox(
      {
        type: 'question',
        buttons: ['Update & Restart', 'Cancel'],
        title: 'Update Available',
        cancelId: 99,
        message:
          'There is an update available. Would you like to update CoinWatch now?',
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
}

export default AutoUpdater;
