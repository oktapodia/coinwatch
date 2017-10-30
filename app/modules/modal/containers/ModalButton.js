import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions';

class ModalButton extends Component {
  render() {
    return (
      <a className={this.props.className} onClick={this.props.openModal}>{this.props.children}</a>
    );
  }
}

export default connect(null, { openModal })(ModalButton);
