import { spy } from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CoinsPage } from '../../../../app/modules/coins/containers/CoinsPage';

Enzyme.configure({ adapter: new Adapter() });

const data = [{
  coin: {
    Id: 1,
    Name: 'Foo',
    Symbol: 'FOO',
    ImageUrl: '/foo',
    FullName: 'Foo (FOO)',
  },
}, {
  coin: {
    Id: 2,
    Name: 'Bar',
    Symbol: 'BAR',
    ImageUrl: '/bar',
    FullName: 'Bar (BAR)',
  },
}];

function setup() {
  const actions = {
    removeCoinSettings: spy(),
  };
  const component = mount(<CoinsPage followedCoins={data} {...actions} />);

  return {
    component,
    actions,
    coins: component.find('.coins'),
  };
}

describe('CoinsPage component', () => {
  it('should mount without price', () => {
    const { coins } = setup();

    console.log(coins.html());
  });
});
