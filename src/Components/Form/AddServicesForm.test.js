import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddServices from '../AddServices/AddServices'
import AddServicesForm from './AddServicesForm';
import {isModuleDeclaration} from '@babel/types';

configure({adapter: new Adapter()})

const data = [
  {
    display_name: 'option1',
    id: 1
  }, {
    display_name: 'option2',
    id: 2
  }
];

test('it should render firstName input field', () => {
  const wrapper = mount(<AddServicesForm data={data}/>);
  expect(wrapper.find('input')).toHaveLength(4);
})

test('it should render firstName input field', () => {
  const wrapper = mount(<AddServicesForm data={data}/>);
  expect(wrapper.find('Button').length).toEqual(1);
})
