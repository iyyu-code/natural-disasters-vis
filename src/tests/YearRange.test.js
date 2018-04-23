import React from 'react';
import ReactDOM from 'react-dom';
import YearRange from '../YearRange';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<YearRange />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const range = renderer.create(<YearRange />).toJSON();
  expect(range).toMatchSnapshot();
})