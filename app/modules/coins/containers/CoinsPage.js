import React, { Component } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import Coin from '../components/Coin';
import CoinSettings from './CoinsSettings';
import { toggleForceRefresh } from '../actions';
import ModalButton from '../../modal/containers/ModalButton';

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
    const { followedCoins } = this.props;

    const followedCoinsDisplay = map(followedCoins, (fc, index) => (
      <Coin key={index} {...fc} />
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
  followedCoins: PropTypes.array.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired,
};

function mapStateToProps({ coins }) {
  return {
    followedCoins: coins.coins,
  };
}

export default connect(mapStateToProps, { toggleForceRefresh })(CoinsPage);
