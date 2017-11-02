import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../actions';

const ModalButton = ({ className, openModal, children }) => (
  <button className={className} onClick={openModal}>{children}</button>
);

ModalButton.propTypes = {
  className: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default connect(null, { openModal })(ModalButton);
