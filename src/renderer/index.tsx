import React from 'react';
import { render } from 'react-dom';
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
  console.log('SETTINGS RECEIVED', settings)
  window.settings = settings
});

window.api.ipcRenderer.getSettings();


document.addEventListener('DOMContentLoaded', async () => {
  // eslint-disable-next-line global-require
  console.log('sss', window)

  await new Promise((resolve) => setTimeout(() => resolve(null), 1000))

  const { configureStore, history } = require('./store/configureStore')

  const store = configureStore({});

  const Root = require('./containers/Root').default;
  render(
    <>
      <CssBaseline />
      <Root store={store} history={history} />
    </>,
    document.getElementById('root')
  );
});
