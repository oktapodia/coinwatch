import { spy } from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Coin from '../../../../app/modules/coins/components/Coin';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const mockStore = configureStore([]);
  const store = mockStore({});
  const coin = {
    Name: 'Foo',
    Symbol: 'FOO',
    ImageUrl: 'http://foo.com',
    FullName: 'Foo (FOO)',
  };
  const actions = {
    getCoinPrice: spy(),
  };
  const component = mount(
    <Provider store={store}>
        <Coin coin={coin} {...actions} />
    </Provider>
  );

  return {
    component,
    actions,
    buttons: component.find('button'),
    img: component.find('.coin .name img'),
  };
}

describe('Coin component', () => {
  it('should display image', () => {
    const { img } = setup();

    console.log(img);

    console.log(img.attr('src'));

    expect(img.attr('src')).toMatch(/^1$/);
  });

  it('should first button should call increment', () => {
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
  });
});
