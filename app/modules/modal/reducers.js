// @flow

import { assign } from 'lodash';
import { OPEN_MODAL, CLOSE_MODAL } from './actions';

const initialState = {
  isOpen: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true };
      break;
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
      break;
    default:
      return state;
  }
}
