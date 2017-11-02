import { spy } from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Coin } from '../../../../app/modules/coins/components/Coin';
import { BASE_IMAGE_URL } from '../../../../app/connectors/cryptocompare/api';

Enzyme.configure({ adapter: new Adapter() });

const coin = {
  Name: 'Foo',
  Symbol: 'FOO',
  ImageUrl: '/foo',
  FullName: 'Foo (FOO)',
};

function setup() {
  const actions = {
    getCoinPrice: spy(),
    removeButtonHandler: spy(),
  };
  const component = mount(<Coin coin={coin} {...actions} />);

  return {
    component,
    actions,
    removeButton: component.find('.coin .actions span'),
    img: component.find('.coin .name img'),
    name: component.find('.coin .name span'),
    price: component.find('.coin .price'),
  };
}

describe('Coin component', () => {
  it('should mount without price', () => {
    const {
      img,
      name,
      price,
      actions,
    } = setup();

    expect(img.prop('src')).toBe(BASE_IMAGE_URL + coin.ImageUrl);
    expect(name.text()).toBe(`${coin.Name} (${coin.Symbol})`);
    expect(price.text()).toBe('Loading...');

    expect(actions.removeButtonHandler.notCalled).toBe(true);
    expect(actions.getCoinPrice.calledWith(coin)).toBe(true);
  });

  it('should mount with price', () => {
    const { img, name, price } = setup();

    console.log(img.prop('src'));

    expect(img.prop('src')).toBe(BASE_IMAGE_URL + coin.ImageUrl);
    expect(name.text()).toBe(`${coin.Name} (${coin.Symbol})`);
    expect(price.text()).toBe('Loading...');
  });
});
