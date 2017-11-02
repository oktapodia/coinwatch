import { CLOSE_MODAL, OPEN_MODAL } from './actions';

const initialState = {
  isOpen: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}
