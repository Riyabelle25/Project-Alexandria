import App from './App';
import React from "react";
import { shallow, mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'; // Smart components

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const initialState = {user: null}
  const mockStore = configureStore()
  let store
  describe('render()', () => {
    test('renders the component', () => {
      store = mockStore(initialState)
      const wrapper = shallow(<Provider store={store}><App /></Provider>);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});


// it("renders correctly", () => {
//   const initialState = {user: null}
//   const mockStore = configureStore()
//   let store = mockStore(initialState)
//   const wrapper = mount(<Provider store={store}><App /></Provider>);
//   expect(wrapper.state("error")).toEqual(null);
// });


//  it("renders without crashing", () => {
//   shallow(<App />);
// });