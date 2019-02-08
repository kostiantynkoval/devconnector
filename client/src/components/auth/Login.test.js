import React from 'react';
import ConnectedLogin, { Login } from './Login';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
//import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

describe('>>>L O G I N --- Render REACT COMPONENTS',() => {
  let wrapper;

  beforeEach( () => {
    wrapper = mount(<Login
      classes={{root: 'root', title: 'title', wrapper: 'form', button: 'btn'}}
      errors={{ email: "", password: ""}}
    />);
  });

  it('+++ render the DUMB component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('+++ render login form with 2 text fields with values set in state.data', () => {
    const instance = wrapper.instance();
    expect(wrapper.find('TextField')).toHaveLength(2);
    instance.onChange({target: { name: 'email', value: 'www@ww.ww'}});

    expect(instance.state.data.email).toBe('www@ww.ww');
  });

  it('+++ check classNames ', () => {
    expect(wrapper.find('form').hasClass('form')).toBe(true);
    expect(wrapper.find('Typography[variant="h3"]').hasClass('title')).toBe(true);
    expect(wrapper.find('button').hasClass('btn')).toBe(true);
  });
});


describe('>>>L O G I N --- Check props and state data/error object',() => {

  it('+++ returns data when sendMessage is called', () => {
    const mock = new MockAdapter(axios);
    const wrapper = mount(<Login
      classes={{root: 'root', title: 'title', wrapper: 'form', button: 'btn'}}
      errors={{ email: "", password: ""}}
    />);

    mock.onPost('/login', {password: "Password incorrect"}).reply(400);
    const instance = wrapper.instance();
    console.log('test');
    instance.onChange({data: { email: 'qq@qq.qq', password: 'Q1qqwqwqw2323dsdsd' }})
    console.log('onchange');
    instance.onSubmit();

    console.log('onsubmit');
    console.log(instance.state);
    expect(instance.state).toMatchObject({error: {password: "Password incorrect"}});
    done();
  });


});