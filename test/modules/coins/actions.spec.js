import { spy } from 'sinon';
import * as actions from '../../../app/modules/coins/actions';

describe('actions', () => {
  it('should get the coins list', () => {
    expect(actions.getCoins()).toMatchSnapshot();
  });

  it('should get the coin price from a symbol', () => {
    const coin = {
      Symbol: 'ETH',
    };
    expect(actions.getCoinPrice(coin)).toMatchSnapshot();
  });
});
