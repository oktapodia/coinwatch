import { Redirect, Route, Switch } from 'react-router';
import App from './containers/App';
import CoinsPage from './modules/coins/containers/CoinsPage';
import IcosPage from './modules/icos/containers/IcosPage';
import SettingsPage from './modules/settings/components';

export default () => (
  <App>
    <Switch>
      <Route path="/settings" component={SettingsPage} />
      <Route path="/" component={CoinsPage} />
      <Route path="/coins" component={CoinsPage} />
      <Redirect exact from="/icos" to="/icos/live" />
      <Route path="/icos/:status" component={IcosPage} />
    </Switch>
  </App>
);
