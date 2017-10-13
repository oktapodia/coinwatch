import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

class AutoUpdater {
  autoUpdater = null;
  constructor() {
    this.autoUpdater = autoUpdater;
    this.autoUpdater.logger = log;
    this.autoUpdater.logger.transports.file.level = 'info';

    this.autoUpdater.on('update-downloaded', this.onUpdateDownloaded);
    this.autoUpdater.on('checking-for-update', this.onCheckingForUpdate);
    this.autoUpdater.on('update-available', this.onUpdateAvailable);
    this.autoUpdater.on('update-not-available', this.onUpdateNotAvailable);
    this.autoUpdater.on('download-progress', this.onDownloadProgress);
    this.autoUpdater.on('error', this.onError);
  }

  onUpdateDownloaded(info) {
    log.debug('onUpdateDownloaded');
    log.debug('Update downloaded; will install in 5 seconds');
    log.debug(info);
    this.autoUpdater.quitAndInstall();
  }

  onCheckingForUpdate(info) {
    log.debug('onCheckingForUpdate');
    log.debug('Checking for update...');
    log.debug(info);
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
