import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SettingsPage from './modules/settings/components';

export default () => (
  <App>
    <Switch>
      <Redirect exact from="/" to="/coins" />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/coins" component={HomePage} />
      <Route path="/icos" component={HomePage} />
    </Switch>
  </App>
);
