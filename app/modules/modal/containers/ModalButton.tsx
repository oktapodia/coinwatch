import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import PropTypes, { InferProps } from 'prop-types';
import { openModal } from '../actions';

const connector = connect(null, { openModal });

type ModalButtonProps = ConnectedProps<typeof connector> & {
  component: FunctionComponent<any>;
  extras: any;
};

const ModalButton: FunctionComponent<ModalButtonProps> = ({
  openModal,
  component,
  extras,
  children,
}) => {
  const onOpenModal = () => {
    return openModal(component, extras);
  };

  return <span onClick={onOpenModal}>{children}</span>;
};

ModalButton.propTypes = {
  className: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  component: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  extras: PropTypes.object,
};

export default connector(ModalButton);
