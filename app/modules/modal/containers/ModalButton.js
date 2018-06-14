import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../actions';

class ModalButton extends Component {
  constructor(props) {
    super(props);

    this.onOpenModal = ::this.onOpenModal;
  }

  onOpenModal() {
    return this.props.openModal(this.props.component, this.props.extras);
  }

  render() {
    const { className, children } = this.props;

    return (
      <button className={className} onClick={this.onOpenModal}>{children}</button>
    );
  }
}

ModalButton.propTypes = {
  className: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  extras: PropTypes.object,
};

ModalButton.defaultProps = {
  extras: {},
};

export default connect(null, { openModal })(ModalButton);
