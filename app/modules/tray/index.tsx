import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forEach } from 'lodash';
import { getCoinPrice, toggleForceRefresh } from '../coins/actions';

class Tray extends Component {
  componentDidMount() {
    this.refresh();
    setInterval(this.refresh, 60000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceRefresh) {
      this.props.toggleForceRefresh();
      this.refresh();
    }
  }

  refresh = () => {
    forEach(this.props.coins, coin =>
      this.props
        .getCoinPrice(coin, this.props.cryptocompareApiKey)
        .catch(console.log)
    );
  };

  render() {
    return <div />;
  }
}

Tray.propTypes = {
  coins: PropTypes.array.isRequired,
  forceRefresh: PropTypes.bool.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired
};

Tray.defaultProps = {
  forceRefresh: false
};

function mapStateToProps({ coins, settings }) {
  return {
    cryptocompareApiKey: settings.cryptocompareApiKey,
    coins: coins.coins,
    forceRefresh: coins.forceRefresh
  };
}

export default connect(mapStateToProps, { getCoinPrice, toggleForceRefresh })(
  Tray
);
