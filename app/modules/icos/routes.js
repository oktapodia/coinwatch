import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import LiveIcosPage from './containers/LiveIcosPage';

const icosRoute = () => {
  console.log('fiohsdohgr');
  console.log('fiohsdohgr');
  console.log('fiohsdohgr');
  console.log('fiohsdohgr');
  return (
    <IcosPage>
      <Redirect exact from="/icos" to="/icos/live" />
      <Route path="/icos/live" component={LiveIcosPage} />
      <Route path="/icos/upcoming" component={IcosPage} />
      <Route path="/icos/finished" component={IcosPage} />
    </IcosPage>
  );
};

export default icosRoute;
