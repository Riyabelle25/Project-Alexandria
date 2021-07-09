import Video from '../../src/views/roomCall';
import React from "react";
import { shallow, mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'; // Smart components

configure({ adapter: new Adapter() });

describe('<Video />', () => {
  const initialState = {user: null}
  const mockStore = configureStore()
  const props = {match: {name: "BookClub"}};
  let store
  describe('render()', () => {
    test('renders the component', () => {
      store = mockStore(initialState)
      const wrapper = shallow(<Provider store={store}><Video {...props} /></Provider>);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});

test('check if video and audio work on giving permissions', () => {
   
    const props = {match: {name: "BookClub"}};
    const wrapper = mount(<Video {...props} />)
    expect(wrapper.instance().state.roomName).toBe("BookClub")
    expect(
        (wrapper.instance().state.video && wrapper.instance().videoAvailable) 
            || (wrapper.instance().state.audio && wrapper.instance().audioAvailable)).toBe(false)
    // wrapper.find('button.counter-button').simulate('click')
    // wrapper.setState({count: 1})
    wrapper.instance().connect()
    expect(wrapper.instance().state.askForUsername).toBe(false)
  })