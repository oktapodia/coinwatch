module.exports = {
  remote: {
    BrowserWindow: () => browserWindow,
    app: {
      getVersion: () => '0.0.1',
    },
    getCurrentWindow: jest.fn(() => browserWindow),
  },
  ipcRenderer: {
    send: jest.fn(),
    on: jest.fn(),
  },
  shell: {
    openExternal: jest.fn(),
  },
};
