// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { coin, prices, removeButtonHandler } = this.props;

    const currentPriceDisplayed = !isUndefined(prices) ? prices.USD : 'Loading...';

    let removeButtonHandlerDisplay = null;
    if (removeButtonHandler) {
      removeButtonHandlerDisplay = (
        <span className="glyphicon glyphicon-remove-circle" onClick={() => removeButtonHandler(coin)} />
      );
    }

    return (
      <div className="coin">
        <div className="name">
          <img src={`${BASE_IMAGE_URL}${coin.ImageUrl}`} className="img-circle" />
          <span>{coin.FullName}</span>
        </div>
        <div className="price">
          <span className="text-right">{currentPriceDisplayed}</span>
        </div>
        <div className="actions">
          {removeButtonHandlerDisplay}
        </div>
      </div>
    );
  }
}

Coin.propTypes = {
  coin: PropTypes.shape({
    ImageUrl: PropTypes.string.isRequired,
    FullName: PropTypes.string.isRequired,
  }).isRequired,
  prices: PropTypes.shape({
    USD: PropTypes.number.isRequired,
  }).isRequired,
  removeButtonHandler: PropTypes.func.isRequired,
};

function mapStateToProps({ coins }, { coin }) {
  return {
    prices: coins.prices[coin.Symbol],
  };
}

export default connect(mapStateToProps, { getCoinPrice })(Coin);
