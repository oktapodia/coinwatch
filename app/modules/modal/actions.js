export const OPEN_MODAL = 'OPEN_MODAL';

export function openModal(component) {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL, component });
  };
}

export const CLOSE_MODAL = 'CLOSE_MODAL';

export function closeModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
}
