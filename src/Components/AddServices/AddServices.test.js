import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddServices from './AddServices';
import axios from 'axios';
import {fakeData} from '../Mocks/axios'

configure({adapter: new Adapter()})

jest.mock('axios', () => ({
  get: jest.fn()
}));

test('fetches data and saves it in state', (done) => {
  axios
    .get
    .mockImplementationOnce(() => Promise.resolve(fakeData));

  const wrapper = shallow(<AddServices/>);

  setTimeout(() => {
    wrapper.update();
    expect(wrapper.state('items')).toEqual(fakeData.data.data);
    done();
  })

});

test('state passes items as props down to correct child component', (done) => {
  axios
    .get
    .mockImplementationOnce(() => Promise.resolve(fakeData));

  const wrapper = shallow(<AddServices/>);

  setTimeout(() => {
    wrapper.update();
    expect(wrapper.childAt(0).props()).toEqual(fakeData.data);
    done();
  })
});
