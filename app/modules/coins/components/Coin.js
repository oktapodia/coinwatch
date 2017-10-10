// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isUndefined, find } from 'lodash';
import { BASE_IMAGE_URL } from '../../../connectors/cryptocompare/api';
import { getCoinPrice } from '../actions';

class Coin extends Component {
  componentWillMount() {
    if (isUndefined(this.props.prices)) {
      this.props.getCoinPrice(this.props.coin);
    }
  }

  render() {
    const { coin, prices } = this.props;

    const currentPriceDisplayed = !isUndefined(prices) ? prices.USD : 'Loading...';

    return (
      <div className="coin">
        <img src={`${BASE_IMAGE_URL}${coin.ImageUrl}`} className="img-circle" width={15} />
        <span>{coin.FullName}</span>
        <span className="text-right">{currentPriceDisplayed}</span>
      </div>
    );
  }
}

function mapStateToProps({ coins }, { coin }) {

  return {
    prices: coins.prices[coin.Symbol],
  };
}

export default connect(mapStateToProps, { getCoinPrice })(Coin);
