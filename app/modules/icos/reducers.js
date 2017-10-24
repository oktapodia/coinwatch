// @flow

import { GET_ICOS_SUCCESS } from './actions';

const initialState = {
  data: [],
};

export default function ICOsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ICOS_SUCCESS:
      return { ...state, data: action.response.ico };
      break;
    default:
      return state;
  }
}
