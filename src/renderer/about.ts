const { ipcRenderer } = require('electron');

ipcRenderer.on('get-version', (_, version) => {
  const versionElement = document.getElementById('version');

  if (versionElement) {
    versionElement.innerHTML = version;
  }
});
