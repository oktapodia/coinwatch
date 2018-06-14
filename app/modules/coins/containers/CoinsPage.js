import React, { Component } from 'react';
import { map, find } from 'lodash';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import Coin from '../components/Coin';
import CoinSettings from './CoinsSettings';
import { toggleForceRefresh } from '../actions';
import ModalButton from '../../modal/containers/ModalButton';
import PropTypes from 'prop-types';

export class CoinsPage extends Component {
  constructor(props) {
    super(props);

    this.onClickForceRefresh = ::this.onClickForceRefresh;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onClickForceRefresh() {
    this.props.toggleForceRefresh();
  }

  render() {
    const { coins, alerts } = this.props;

    const followedCoinsDisplay = map(coins, (fc, index) => (
      <Coin key={index} {...fc} alert={alerts[fc.slug]} />
    ));

    return (
      <div className="app-container coins" id="coins">
        <div>
          <h3>coins:</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Exchange</th>
                <th>Price</th>
                <th className="toolbar">
                  <ModalButton className="pull-right" component={CoinSettings}><span className="glyphicon glyphicon-plus" /></ModalButton>
                  <button onClick={this.onClickForceRefresh} className="link-force-refresh pull-right"><span className="glyphicon glyphicon-refresh" aria-hidden="true" /></button>
                </th>
              </tr>
            </thead>
            <tbody>
              {followedCoinsDisplay}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

CoinsPage.propTypes = {
  coins: PropTypes.array.isRequired,
  alerts: PropTypes.object.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired,
};

function mapStateToProps({ coins }) {
  return {
    coins: coins.coins,
    alerts: coins.alerts,
  };
}

export default connect(mapStateToProps, { toggleForceRefresh })(CoinsPage);
