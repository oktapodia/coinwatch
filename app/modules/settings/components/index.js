// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainSettings from './MainSettings';

class Settings extends Component {
  render() {
    return (
      <div>
        <MainSettings settings={this.props.settings} />
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
