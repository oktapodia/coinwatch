import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forEach, map, find } from 'lodash';
import { getCoinPrice, toggleForceRefresh } from '../coins/actions';

class Tray extends Component {
  constructor() {
    super();
    this.refresh = ::this.refresh;
  }

  componentDidMount() {
    setInterval(this.refresh, 30000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceRefresh) {
      this.props.toggleForceRefresh();
      this.refresh();
    }
  }

  refresh() {
    forEach(this.props.coins, (coin) => {
      return this.props.getCoinPrice(coin);
    });
  }

  render() {
    return <div />;
  }
}

function mapStateToProps({ coins }) {
  return {
    coins: coins.coins,
    forceRefresh: coins.forceRefresh,
  };
}

export default connect(mapStateToProps, { getCoinPrice, toggleForceRefresh })(Tray);
