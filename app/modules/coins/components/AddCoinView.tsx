import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoinsSettings from '../containers/CoinsSettings';

class AddCoinView extends Component {
  render() {
    if (!this.props.isOpen) {
      return <div />;
    }

    return <CoinsSettings />;
  }
}

function mapStateToProps({ modal }) {
  return {
    isOpen: modal.isOpen,
  };
}

export default connect(mapStateToProps)(AddCoinView);
