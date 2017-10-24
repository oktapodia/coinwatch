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
    const { img, name, price, actions } = setup();

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

 /* it('should first button should call increment', () => {
    const { buttons, actions } = setup();
    buttons.at(0).simulate('click');
    expect(actions.increment.called).toBe(true);
  });

  it('should match exact snapshot', () => {
    const { actions } = setup();
    const tree = renderer
      .create(
        <div>
          <Router>
            <Counter counter={1} {...actions} />
          </Router>
        </div>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should second button should call decrement', () => {
    const { buttons, actions } = setup();
    buttons.at(1).simulate('click');
    expect(actions.decrement.called).toBe(true);
  });

  it('should third button should call incrementIfOdd', () => {
    const { buttons, actions } = setup();
    buttons.at(2).simulate('click');
    expect(actions.incrementIfOdd.called).toBe(true);
  });

  it('should fourth button should call incrementAsync', () => {
    const { buttons, actions } = setup();
    buttons.at(3).simulate('click');
    expect(actions.incrementAsync.called).toBe(true);
  });*/
});
