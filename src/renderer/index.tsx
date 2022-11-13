import React from 'react';
import { createRoot } from 'react-dom/client';
// import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

declare global {
  interface Window {
    api?: any;
    settings?: any;
  }
}

// calling IPC exposed from preload script
window.api.ipcRenderer.once('settings', (settings: any) => {
  console.log('SETTINGS RECEIVED', settings);
  window.settings = settings;
});

window.api.ipcRenderer.getSettings();

document.addEventListener('DOMContentLoaded', async () => {
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

  // eslint-disable-next-line global-require
  const { configureStore, history } = require('./store/configureStore');

  const store = configureStore({ settings: window.settings });

  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <>
      <CssBaseline />
      <Root store={store} history={history} />
    </>
  );
});
