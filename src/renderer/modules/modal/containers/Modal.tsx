// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Backdrop, Fade } from '@material-ui/core';
import { closeModal } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

function ModalClass(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const CustomComponent = props.component;

  const classes = useStyles();

  const { isOpen, extras } = useSelector((state) => state.modal);

  if (!CustomComponent) {
    return null;
  }

  const handleClose = () => {
    props.closeModal();
  };

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          {/* eslint-disable-next-line react/destructuring-assignment */}
          <CustomComponent closeModal={props.closeModal} extras={extras} />
        </div>
      </Fade>
    </Modal>
  );
}

ModalClass.propTypes = {
  closeModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  extras: PropTypes.object,
};

ModalClass.defaultProps = {
  component: null,
  extras: {},
};

function mapStateToProps({ modal }) {
  return {
    isOpen: modal.isOpen,
    component: modal.component,
    extras: modal.extras,
  };
}

export default connect(mapStateToProps, { closeModal })(ModalClass);
