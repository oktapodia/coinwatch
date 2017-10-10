// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import Coin from '../modules/coins/components/Coin';

class Home extends Component {
  render() {
    const { coins } = this.props;

    const list = map(coins, (coin) => {
      return <Coin coin={coin} key={coin.Id} />;
    });

    return (
      <div>
        {list}
      </div>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    coins: settings.coins,
  };
}

export default connect(mapStateToProps)(Home);
