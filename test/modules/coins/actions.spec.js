import * as actions from '../../../app/modules/coins/actions';

describe('actions', () => {
  it('should get the coins list', () => {
    expect(actions.getCoins()).toMatchSnapshot();
  });

  it('should get the exchanges list', () => {
    expect(actions.getExchangeList()).toMatchSnapshot();
  });

  it('should get the coin price with a coin argument only', () => {
    const data = {
      coin: {
        Symbol: 'ETH'
      }
    };
    expect(actions.getCoinPrice(data)).toMatchSnapshot();
  });

  it('should get the coin price with a coin and symbol arguments', () => {
    const data = {
      coin: {
        Symbol: 'ETH'
      },
      symbol: 'USD'
    };
    expect(actions.getCoinPrice(data)).toMatchSnapshot();
  });

  it('should get the coin price with a coin and symbol and exchange arguments', () => {
    const data = {
      coin: {
        Symbol: 'ETH'
      },
      symbol: 'USD',
      exchange: 'Bitfinex'
    };
    expect(actions.getCoinPrice(data)).toMatchSnapshot();
  });
});
