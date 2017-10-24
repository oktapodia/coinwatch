import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import MyApp from './containers/MyApp';
import createStore from './createStore';
export default function renderAppWithState(state, component) {
  const store = createStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
  return [store, wrapper];
}
