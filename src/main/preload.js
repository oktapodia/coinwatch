const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  ipcRenderer: {
    getSettings() {
      ipcRenderer.send('settings/get');
    },
    setSettings(settings) {
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
    notification(notification) {
      ipcRenderer.send('notification', notification);
    },
    trayUpdate(coins) {
      ipcRenderer.send('tray-update', coins);
    },
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example', 'settings'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example', 'settings'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
