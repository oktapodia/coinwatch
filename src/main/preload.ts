import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ipcRenderer: {
    getSettings() {
      ipcRenderer.send('settings/get', 'settings');
    },
    setSettings(settings: any) {
      ipcRenderer.send('settings/set', settings);
    },
    checkUpdate() {
      ipcRenderer.send('check-update');
    },
    autoLaunchOn() {
      ipcRenderer.send('autolaunch-on');
    },
    autoLaunchOff() {
      ipcRenderer.send('autolaunch-off');
    },
    trayUpdate(data: any) {
      ipcRenderer.send('tray-update', data);
    },
    notification(data: any) {
      ipcRenderer.send('notification', data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example', 'settings'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example', 'settings'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});
