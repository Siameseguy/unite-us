import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorBoundary from './ErrorBoundary'
import ErrorMessage from './ErrorMessage';

configure({adapter: new Adapter()});

describe('<ErrorMessage />', () => {
  it('should do something', () => {
    const wrapper = shallow(<ErrorMessage/>);
    expect(wrapper.exists('true'));
  })
});