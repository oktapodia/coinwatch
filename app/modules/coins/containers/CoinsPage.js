// @flow
import React, { Component } from 'react';
import CoinSettings from './CoinsSettings';

export default class CoinsPage extends Component {
  render() {
    return (
      <div className="app-container coins">
        <CoinSettings />
      </div>
    );
  }
}
