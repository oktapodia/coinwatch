// @flow
import React, { Component } from 'react';
import { map } from 'lodash';
import CoinSettings from '../modules/settings/components/CoinsSettings';

const Home = () => (
  <div className="app-container coins">
    <CoinSettings />
  </div>
);

export default Home;
