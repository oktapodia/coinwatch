import React from 'react';
import { Route, Switch } from 'react-router';
import App from './containers/App';
import CoinsPage from './modules/coins/containers/CoinsPage';
import SettingsPage from './modules/settings/components';

const routes = () => (
  <App>
    <Switch>
      <Route path="/settings" component={SettingsPage} />
      <Route path="/" component={CoinsPage} />
      <Route path="/coins" component={CoinsPage} />
    </Switch>
  </App>
);

export default routes;
