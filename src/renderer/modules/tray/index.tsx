// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forEach } from 'lodash';
import { getCoinPrice, toggleForceRefresh } from '../coins/actions';

class Tray extends Component<any, any> {
  componentDidMount() {
    this.refresh();
    setInterval(this.refresh, 60000);
  }

  UNSAFE_componentWillReceiveProps(nextProps: { forceRefresh: any }) {
    if (nextProps.forceRefresh) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.toggleForceRefresh();
      this.refresh();
    }
  }

  refresh = () => {
    // eslint-disable-next-line react/destructuring-assignment
    forEach(this.props.coins, (coin) =>
      // eslint-disable-next-line react/destructuring-assignment
      this.props.getCoinPrice(coin).catch(console.log)
    );
  };

  render() {
    return <div />;
  }
}

Tray.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  coins: PropTypes.array.isRequired,
  forceRefresh: PropTypes.bool,
  getCoinPrice: PropTypes.func.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired,
};

Tray.defaultProps = {
  forceRefresh: false,
};

function mapStateToProps({ coins, settings }) {
  return {
    coins: coins.coins,
    forceRefresh: coins.forceRefresh,
  };
}

export default connect(mapStateToProps, { getCoinPrice, toggleForceRefresh })(
  Tray
);
