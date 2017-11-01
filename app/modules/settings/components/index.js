// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainSettings from './MainSettings';

class Settings extends Component {
  render() {
    return (
      <MainSettings settings={this.props.settings} />
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    settings: settings,
  };
}

export default connect(mapStateToProps)(Settings);
