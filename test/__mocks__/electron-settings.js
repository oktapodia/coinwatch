module.exports = {
  remote: {
    app: {
      getVersion: () => '0.0.1'
    }
  },
  ipcRenderer: {
    send: jest.fn(),
    on: jest.fn()
  },
  shell: {
    openExternal: jest.fn()
  },
  get: jest.fn()
};
