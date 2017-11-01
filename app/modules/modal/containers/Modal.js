import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from "../actions";

class ModalClass extends Component {
  render() {
    const { isOpen, closeModal, Component } = this.props;

    const customStyles = {
      content : {
        top    : '100px',
        left   : '100px',
        right  : '100px',
        bottom : '100px',
        color  : '#000000',
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick
        style={customStyles}
      >
        <a onClick={closeModal} className="pull-right"><span className="glyphicon glyphicon-remove" /></a>
        <div>
          <Component closeModal={closeModal} />
        </div>
      </Modal>
    )
  }
}

function mapStateToProps({ modal }) {
  return {
    isOpen: modal.isOpen,
  };
}

export default connect(mapStateToProps, { closeModal })(ModalClass);
