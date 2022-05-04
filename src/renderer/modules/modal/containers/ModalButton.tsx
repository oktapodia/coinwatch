// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../actions';

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

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  return <span onClick={onOpenModal}>{children}</span>;
};

ModalButton.propTypes = {
  openModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  extras: PropTypes.object,
};

export default connect(null, { openModal })(ModalButton);
