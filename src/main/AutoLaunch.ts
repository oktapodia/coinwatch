import { app, ipcMain } from 'electron';
import AutoLaunchPackage from 'auto-launch';

class AutoLaunch {
  autoLaunch;

  constructor() {
    this.autoLaunch = new AutoLaunchPackage({
      name: app.name,
      path: process.execPath.match(/.*?\.app/)![0],
      isHidden: true,
    });

    ipcMain.on('autolaunch-on', this.onAutolaunchOn);
    ipcMain.on('autolaunch-off', this.onAutolaunchOff);
  }

  onAutolaunchOn = () => {
    console.log('autostart on');
    this.autoLaunch.enable();
  };

  onAutolaunchOff = () => {
    console.log('autostart off');
    this.autoLaunch.disable();
  };
}

export default AutoLaunch;
