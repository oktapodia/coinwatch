import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

class AutoUpdater {
  autoUpdater: autoUpdater = null;
  constructor() {
    this.autoUpdater = autoUpdater;
    this.autoUpdater.logger = log;
    this.autoUpdater.logger.transports.file.level = 'info';

/*    this.autoUpdater.on('update-downloaded', this.onUpdateDownloaded.bind(this));
    this.autoUpdater.on('checking-for-update', this.onCheckingForUpdate.bind(this));
    this.autoUpdater.on('update-available', this.onUpdateAvailable.bind(this));
    this.autoUpdater.on('update-not-available', this.onUpdateNotAvailable.bind(this));
    this.autoUpdater.on('download-progress', this.onDownloadProgress.bind(this));
    this.autoUpdater.on('error', this.onError.bind(this));

    this.autoUpdater.checkForUpdates();*/
  }

  onUpdateDownloaded(info) {
    log.debug('onUpdateDownloaded');
    log.debug('Update downloaded; will install in 5 seconds');
    log.debug(info);
    this.autoUpdater.quitAndInstall();
  }

  onCheckingForUpdate() {
    log.debug('onCheckingForUpdate');
    log.debug('Checking for update...');
    this.autoUpdater.quitAndInstall();
  }

  onUpdateAvailable(info) {
    log.debug('onUpdateAvailable');
    log.debug('Update available.');
    log.debug(info);
  }

  onUpdateNotAvailable(info) {
    log.debug('onUpdateNotAvailable');
    log.debug('Update not available.');
    log.debug(info);
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
}

export default AutoUpdater;
