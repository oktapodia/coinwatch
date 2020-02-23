export const OPEN_MODAL = 'OPEN_MODAL';

export function openModal(component, extras = {}) {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL, component, extras });
  };
}

export const CLOSE_MODAL = 'CLOSE_MODAL';

export function closeModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
}
