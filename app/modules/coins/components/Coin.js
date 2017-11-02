import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'lodash';
import { BASE_IMAGE_URL } from '../../../connectors/cryptocompare/api';
import { getCoinPrice, removeCoin, toggleVisibility } from '../actions';

export class Coin extends Component {
  constructor(props) {
    super(props);

    this.onRemove = ::this.onRemove;
    this.onToggleVisibility = ::this.onToggleVisibility;
  }

  componentWillMount() {
    if (isNull(this.props.price)) {
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
    const {
      coin,
      price,
      visibility,
      slug,
    } = this.props;
    const currentPriceDisplayed = !isNull(price) ? `${price}` : 'Loading...';

    return (
      <tr className="coin">
        <td className="name">
          <img src={`${BASE_IMAGE_URL}${coin.ImageUrl}`} className="img-circle" alt={coin.FullName} />
          <span>{coin.FullName}</span>
        </td>
        <td className="price">
          {currentPriceDisplayed}
        </td>
        <td className="actions toolbar">
          <button onClick={() => this.onToggleVisibility(slug)} className="visibility"><span className={`glyphicon glyphicon-eye-open toggle-button ${visibility && 'active'}`} /></button>
          <button onClick={() => this.onRemove(slug)} className="remove"><span className="glyphicon glyphicon-remove-circle" /></button>
        </td>
      </tr>
    );
  }
}

Coin.propTypes = {
  price: PropTypes.string,
  coin: PropTypes.shape({
    ImageUrl: PropTypes.string.isRequired,
    FullName: PropTypes.string.isRequired,
  }).isRequired,
  visibility: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  removeCoin: PropTypes.func.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
};

Coin.defaultProps = {
  price: null,
};

export default connect(null, { getCoinPrice, removeCoin, toggleVisibility })(Coin);
