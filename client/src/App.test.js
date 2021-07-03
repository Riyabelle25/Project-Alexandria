import App from './App';
import React from "react";
import { shallow, mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
// import Account from "./Account";
// import toJson from "enzyme-to-json";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("renders correctly", () => {
  const wrapper = mount(<App />);
  expect(wrapper.state("error")).toEqual(null);
});


 it("renders without crashing", () => {
  shallow(<App />);
});