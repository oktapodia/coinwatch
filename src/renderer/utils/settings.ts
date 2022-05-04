function get(key?: string) {
  if (!key) {
    return window.settings;
  }

  console.log(window.settings)

  return window.settings[key];
}

function has(key: string) {
  return !!window.settings[key];
}

function set(keyOrValue: string | any, value?: any) {
  if (value) {
    window.settings[keyOrValue] = value;
    return window.api.ipcRenderer.setSettings(window.settings);
  }

  return window.api.ipcRenderer.setSettings(keyOrValue);
}

export default { get, has, set };
