import Chat from "../../src/components/Chat";
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; // Smart components

configure({ adapter: new Adapter() });

describe("<Chat />", () => {
  const initialState = { user: null };
  const mockStore = configureStore();
  let store;
  describe("render()", () => {
    test("renders the component", () => {
      store = mockStore(initialState);
      const wrapper = shallow(
        <Provider store={store}>
          <Chat />
        </Provider>
      );
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
