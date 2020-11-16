import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { configureStore, history } from './store/configureStore';

const store = configureStore({});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <>
      <CssBaseline/>
      <AppContainer>
        <Root store={store} history={history}/>
      </AppContainer>
    </>,
    document.getElementById('root')
  );
});
