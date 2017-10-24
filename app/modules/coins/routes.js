import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import CoinsPage from './containers/CoinsPage';
import SettingsPage from '../settings/components';

export default () => (
  <div>
    <Redirect exact from="/" to="/coins" />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/coins" component={CoinsPage} />
  </div>
);
