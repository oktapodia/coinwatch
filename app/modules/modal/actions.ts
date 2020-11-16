import { Dispatch } from 'redux';

export const OPEN_MODAL = 'OPEN_MODAL';

export function openModal(component, extras = {}) {
  return (dispatch: Dispatch) => {
    dispatch({ type: OPEN_MODAL, component, extras });
  };
}

export const TOGGLE_ADD_MODAL = 'TOGGLE_ADD_MODAL';

export function toggleAddModal() {
  return (dispatch: Dispatch) => {
    dispatch({ type: TOGGLE_ADD_MODAL });
  };
}

export const CLOSE_MODAL = 'CLOSE_MODAL';

export function closeModal() {
  return (dispatch: Dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
}
