// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUndefined, find } from 'lodash';
import { BASE_IMAGE_URL } from '../../../connectors/cryptocompare/api';
import { getCoinPrice } from '../actions';
import { removeCoin, toggleVisibility } from '../actions';

export class Coin extends Component {
  constructor(props) {
    super(props);

    this.onRemove = ::this.onRemove;
    this.onToggleVisibility = ::this.onToggleVisibility;
  }

  componentWillMount() {
    if (isUndefined(this.props.price)) {
      this.props.getCoinPrice(this.props);
    }
  }

  onRemove(slug) {
    this.props.removeCoin(slug);
  }

  onToggleVisibility(slug) {
    this.props.toggleVisibility(slug);
  }

  render() {
    const { coin, price, visibility, slug } = this.props;
    const currentPriceDisplayed = !isUndefined(price) ? `${price}` : 'Loading...';

    return (
      <tr className="coin">
        <td className="name">
          <img src={`${BASE_IMAGE_URL}${coin.ImageUrl}`} className="img-circle" />
          <span>{coin.FullName}</span>
        </td>
        <td className="price">
          {currentPriceDisplayed}
        </td>
        <td className="actions">
          <a onClick={() => this.onToggleVisibility(slug)} className="visibility"><span className={`glyphicon glyphicon-eye-open toggle-button ${visibility && 'active'}`} /></a>
          <a onClick={() => this.onRemove(slug)} className="remove"><span className="glyphicon glyphicon-remove-circle" /></a>
        </td>
      </tr>
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
  price: PropTypes.string,
  removeCoin: PropTypes.func.isRequired,
};

export default connect(null, { getCoinPrice, removeCoin, toggleVisibility })(Coin);
