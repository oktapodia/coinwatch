import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSettings from './MainSettings';

class Settings extends Component {
  render() {
    return <MainSettings settings={this.props.settings} />;
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
};

function mapStateToProps({ settings }) {
  return {
    settings,
  };
}

export default connect(mapStateToProps)(Settings);
