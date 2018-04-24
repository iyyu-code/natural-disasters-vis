import React from 'react';
import ReactDOM from 'react-dom';
import DropdownContainer from '../DropdownContainer';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( < DropdownContainer / > , div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const dropdownContainer = renderer.create( < DropdownContainer / > ).toJSON();
  expect(dropdownContainer).toMatchSnapshot();
});