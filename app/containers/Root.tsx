import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Store } from '../reducers/types';
import App from './App';
import CoinsPage from '../modules/coins/containers/CoinsPage';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store }: Props) => {
  return (
    <Provider store={store}>
      <App>
        <CoinsPage />
      </App>
    </Provider>
  );
};

export default hot(Root);
