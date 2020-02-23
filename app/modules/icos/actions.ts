// @flow

import { CALL_HANDLER } from '../../middleware/handler';
import { getIcosListApi } from '../../connectors/icowatchlist/api';

export const GET_ICOS_ATTEMPT = 'GET_ICOS_ATTEMPT';
export const GET_ICOS_SUCCESS = 'GET_ICOS_SUCCESS';
export const GET_ICOS_FAILURE = 'GET_ICOS_FAILURE';

export function getIcos() {
  return {
    [CALL_HANDLER]: {
      types: [GET_ICOS_ATTEMPT, GET_ICOS_SUCCESS, GET_ICOS_FAILURE],
      handler: getIcosListApi,
    },
  };
}
