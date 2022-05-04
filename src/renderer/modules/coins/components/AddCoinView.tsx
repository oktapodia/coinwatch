// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CoinsSettings from '../containers/CoinsSettings';
import { Coin } from './Coin';

function AddCoinView({ isOpen }) {
  if (!isOpen) {
    return <div />;
  }

  return <CoinsSettings />;
}

AddCoinView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

function mapStateToProps({ modal }) {
  return {
    isOpen: modal.isOpen,
  };
}

export default connect(mapStateToProps)(AddCoinView);
