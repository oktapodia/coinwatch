const ipcRenderer = require("electron").ipcRenderer;
ipcRenderer.on("get-version", function (event, version) {
  document.getElementById("version").innerHTML = version;
});
