import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import SettingsPage from './modules/settings/components';

export default () => (
  <App>
    <Switch>
      <Route path="/settings" component={SettingsPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
