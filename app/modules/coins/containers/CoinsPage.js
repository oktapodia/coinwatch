// @flow
import React, { Component } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import Coin from '../components/Coin';
import CoinSettings from './CoinsSettings';
import { toggleForceRefresh } from '../actions';
import ModalButton from '../../modal/containers/ModalButton';
import Modal from '../../modal/containers/Modal';
import shallowCompare from 'react-addons-shallow-compare';

export class CoinsPage extends Component {
  constructor(props) {
    super(props);

    this.onClickForceRefresh = ::this.onClickForceRefresh;
  }

  onClickForceRefresh() {
    this.props.toggleForceRefresh();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { followedCoins } = this.props;

    const followedCoinsDisplay = map(followedCoins, (fc, index) => {
      return (
        <Coin key={index} {...fc} />
      );
    });

    return (
      <div className="app-container coins">
        <div>
          <h3>coins:</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price</th>
                <th className="toolbar">
                  <ModalButton className="pull-right"><span className="glyphicon glyphicon-plus" /></ModalButton>
                  <a onClick={this.onClickForceRefresh} className="link-force-refresh pull-right"><span className="glyphicon glyphicon-refresh" aria-hidden="true" /></a>
                </th>
              </tr>
            </thead>
            <tbody>
              {followedCoinsDisplay}
            </tbody>
          </table>
        </div>
        <Modal Component={CoinSettings} />
      </div>
    );
  }
}

function mapStateToProps({ coins }) {
  return {
    followedCoins: coins.coins,
  };
}

export default connect(mapStateToProps, { toggleForceRefresh })(CoinsPage);
