// @flow
import React, { Component } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Coin from '../components/Coin';
import CoinSettings from './CoinsSettings';
import ModalButton from '../../modal/containers/ModalButton';
import Modal from '../../modal/containers/Modal';

export class CoinsPage extends Component {
  render() {
    const { followedCoins } = this.props;

    const followedCoinsDisplay = map(followedCoins, (fc) => {
      return (
        <Coin key={fc.coin.Id} {...fc} />
      );
    });

    return (
      <div className="app-container coins">
        <div>
          <h3>Your coins: <ModalButton className="pull-right"><span className="glyphicon glyphicon-plus" /></ModalButton></h3>
          {followedCoinsDisplay}
        </div>
        <Modal Component={CoinSettings} />
      </div>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    followedCoins: settings.coins,
  };
}

export default connect(mapStateToProps)(CoinsPage);
