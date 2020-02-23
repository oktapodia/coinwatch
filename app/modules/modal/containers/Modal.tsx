import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../actions';

class ModalClass extends Component {
  render() {
    const { isOpen } = this.props;
    const CustomComponent = this.props.component;

    if (!CustomComponent) {
      return null;
    }

    const customStyles = {
      content: {
        top: '100px',
        left: '100px',
        right: '100px',
        bottom: '100px',
        color: '#000000'
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick
        style={customStyles}
      >
        <button onClick={this.props.closeModal} className="pull-right">
          <span className="glyphicon glyphicon-remove" />
        </button>
        <div>
          <CustomComponent
            closeModal={this.props.closeModal}
            extras={this.props.extras}
          />
        </div>
      </Modal>
    );
  }
}

ModalClass.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  component: PropTypes.func,
  extras: PropTypes.object
};

ModalClass.defaultProps = {
  component: null,
  extras: {}
};

function mapStateToProps({ modal }) {
  return {
    isOpen: modal.isOpen,
    component: modal.component,
    extras: modal.extras
  };
}

export default connect(mapStateToProps, { closeModal })(ModalClass);
