// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUndefined, find } from 'lodash';
import { BASE_IMAGE_URL } from '../../../connectors/cryptocompare/api';
import { getCoinPrice } from '../actions';
import { removeCoinSettings } from '../../settings/actions';

export class Coin extends Component {
  constructor(props) {
    super(props);

    this.onRemove = ::this.onRemove;
    this.onToggleVisibility = ::this.onToggleVisibility;
  }

  componentWillMount() {
    if (isUndefined(this.props.prices)) {
      this.props.getCoinPrice(this.props);
    }
  }

  onRemove(coin) {
    this.props.removeCoinSettings(coin);
  }

  onToggleVisibility(coin) {
    this.props.removeCoinSettings(coin);
  }

  render() {
    const { coin, prices } = this.props;
    const currentPriceDisplayed = !isUndefined(prices) ? `${prices}` : 'Loading...';

    return (
      <div className="coin">
        <div className="name">
          <img src={`${BASE_IMAGE_URL}${coin.ImageUrl}`} className="img-circle" />
          <span>{coin.FullName}</span>
        </div>
        <div className="price">
          {currentPriceDisplayed}
        </div>
        <div className="actions">
          <a onClick={() => this.onToggleVisibility(coin)}><span className="glyphicon glyphicon-eye-open toggle-button" /></a>
          <a onClick={() => this.onRemove(coin)}><span className="glyphicon glyphicon-remove-circle" /></a>
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
  to: PropTypes.string,
  exchange: PropTypes.string,
  prices: PropTypes.shape({
    USD: PropTypes.number,
  }),
  removeCoinSettings: PropTypes.func.isRequired,
};

function mapStateToProps({ coins }, { coin }) {
  return {
    prices: coins.prices[coin.Symbol],
  };
}

export default connect(mapStateToProps, { getCoinPrice, removeCoinSettings })(Coin);
