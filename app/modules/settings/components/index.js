// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainSettings from './MainSettings';
import CoinsSettings from './CoinsSettings';

class Settings extends Component {
  render() {
    console.log(this.props.settings);

    return (
      <div>
        <MainSettings settings={this.props.settings} />
        <CoinsSettings followedCoins={this.props.settings.coins} />
      </div>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    settings: settings,
  };
}


export default connect(mapStateToProps)(Settings);
