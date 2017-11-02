import { ipcRenderer } from 'electron';
import reducers from '../../../app/modules/coins/reducers';
import { GET_COINS_SUCCESS, GET_COIN_PRICE_SUCCESS, GET_EXCHANGE_LIST_SUCCESS, GET_SYMBOL_LIST_SUCCESS } from '../../../app/modules/coins/actions';

describe('reducers', () => {
  describe('coins', () => {
    it('should handle initial state', () => {
      expect(reducers(undefined, {})).toMatchSnapshot();
    });

    it('should handle GET_COINS_SUCCESS', () => {
      expect(reducers(undefined, { type: GET_COINS_SUCCESS, response: [{ Name: 'foo' }] })).toMatchSnapshot();
    });

    it('should handle GET_EXCHANGE_LIST_SUCCESS', () => {
      expect(reducers(undefined, { type: GET_EXCHANGE_LIST_SUCCESS, response: ['foo'] })).toMatchSnapshot();
    });

    it('should handle GET_SYMBOL_LIST_SUCCESS', () => {
      expect(reducers(undefined, { type: GET_SYMBOL_LIST_SUCCESS, response: ['foo'] })).toMatchSnapshot();
    });

    it('should handle GET_COIN_PRICE_SUCCESS', () => {
      expect(reducers(undefined, { type: GET_COIN_PRICE_SUCCESS, data: { coin: { Symbol: 'foo' } }, response: 'bar' })).toMatchSnapshot();

      expect(ipcRenderer.send).toHaveBeenCalledTimes(1);
      expect(ipcRenderer.send).toHaveBeenCalledWith('tray-update', { foo: 'bar' });
      ipcRenderer.send.mockReset();
    });

    it('should handle unknown action type', () => {
      expect(reducers(undefined, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
