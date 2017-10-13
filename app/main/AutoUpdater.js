import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

class AutoUpdater {
  autoUpdater: autoUpdater = null;
  constructor() {
    this.autoUpdater = autoUpdater;
    this.autoUpdater.logger = log;
    this.autoUpdater.logger.transports.file.level = 'info';

    this.autoUpdater.on('update-downloaded', this.onUpdateDownloaded.bind(this));
    this.autoUpdater.on('checking-for-update', this.onCheckingForUpdate.bind(this));
    this.autoUpdater.on('update-available', this.onUpdateAvailable.bind(this));
    this.autoUpdater.on('update-not-available', this.onUpdateNotAvailable.bind(this));
    this.autoUpdater.on('download-progress', this.onDownloadProgress.bind(this));
    this.autoUpdater.on('error', this.onError.bind(this));

    // this.autoUpdater.checkForUpdates();
  }

  onUpdateDownloaded(info) {
    log.debug('onUpdateDownloaded');
    log.debug('Update downloaded; will install in 5 seconds');

    log.debug(info);
    // this.autoUpdater.quitAndInstall();
  }

  onCheckingForUpdate() {
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

    this.displayNoUpdateAvailableDialog();
  }

  onError(err) {
    log.debug('error');
    log.debug(err);

  }

  onDownloadProgress(info) {
    log.debug('onDownloadProgress');
    log.debug('Update not available.');
    log.debug(info);
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
        console.log('Exit: ' + response); // eslint-disable-line no-console

        if (response === 0) {
          autoUpdater.quitAndInstall();
        }
      }
    );
  }

  displayNoUpdateAvailableDialog() {
    dialog.showMessageBox(
      {
        type: 'info',
        buttons: ['Ok'],
        title: 'No update available',
        message:
          'You already have the latest version available',
      }
    );
  }
}

export default AutoUpdater;
