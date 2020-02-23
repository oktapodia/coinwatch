import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from '../routes';
import { Store } from '../reducers/types';
import { hot } from 'react-hot-loader/root';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default hot(Root);
