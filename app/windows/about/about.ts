const { ipcRenderer } = require('electron');

ipcRenderer.on('get-version', (event, version) => {
  document.getElementById('version').innerHTML = version;
});
