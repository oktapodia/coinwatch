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
  const CustomComponent = props.component;

  if (!CustomComponent) {
    return null;
  }

  const classes = useStyles();

  const handleClose = () => {
    props.closeModal();
  };

  const { isOpen, component, extras } = useSelector((state) => state.modal);

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
          <CustomComponent closeModal={props.closeModal} extras={extras} />
        </div>
      </Fade>
    </Modal>
  );
}

ModalClass.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  component: PropTypes.object,
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
