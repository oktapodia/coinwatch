// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSettings from './MainSettings';

function Settings({ settings }) {
  return <MainSettings settings={settings} />;
}

Settings.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  settings: PropTypes.object.isRequired,
};

function mapStateToProps({ settings }) {
  return {
    settings,
  };
}

export default connect(mapStateToProps)(Settings);
