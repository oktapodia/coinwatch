import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { BASE_IMAGE_URL } from '../../../connectors/cryptocompare/api';
import { getCoinPrice, removeCoin, toggleVisibility, toggleForceRefresh } from '../actions';
import formatPrice from '../../../helpers/formatPrice';
import trendToArrow from '../../../helpers/trendToArrow';
import ModalButton from '../../modal/containers/ModalButton';
import AlertSettings from '../containers/AlertSettings';

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
    this.props.toggleForceRefresh();
  }

  render() {
    const {
      coin,
      price,
      visibility,
      alert,
      slug,
      to,
      trend,
      exchange,
    } = this.props;
    const currentPriceDisplayed = !isNull(price) ? `${price}` : 'Loading...';

    return (
      <tr className="coin">
        <td className="name">
          <img src={`${BASE_IMAGE_URL}${coin.ImageUrl}`} className="img-circle" alt={coin.FullName} />
          <span>{coin.FullName}</span>
        </td>
        <td className="exchange">
          {exchange}
        </td>
        <td className={`price trend-${trend}`}>
          {formatPrice(currentPriceDisplayed, to)}{trendToArrow(trend)}
        </td>
        <td className="actions toolbar">
          {/* <ModalButton className="pull-right"><span className="glyphicon glyphicon-plus" /></ModalButton> */}

          <ModalButton className="alert" component={AlertSettings} extras={{ slug }}><span className={`glyphicon glyphicon-bell toggle-button ${alert && 'active'}`} /></ModalButton>
          <button onClick={() => this.onToggleVisibility(slug)} className="visibility"><span className={`glyphicon glyphicon-eye-open toggle-button ${visibility && 'active'}`} /></button>
          <button onClick={() => this.onRemove(slug)} className="remove"><span className="glyphicon glyphicon-remove-circle" /></button>
        </td>
      </tr>
    );
  }
}

Coin.propTypes = {
  exchange: PropTypes.string.isRequired,
  price: PropTypes.string,
  alert: PropTypes.string,
  coin: PropTypes.shape({
    ImageUrl: PropTypes.string.isRequired,
    FullName: PropTypes.string.isRequired,
  }).isRequired,
  visibility: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  trend: PropTypes.string.isRequired,
  removeCoin: PropTypes.func.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired,
};

Coin.defaultProps = {
  price: null,
  alert: null,
};

const dispatchProps = {
  getCoinPrice,
  removeCoin,
  toggleVisibility,
  toggleForceRefresh,
};

export default connect(null, dispatchProps)(Coin);
