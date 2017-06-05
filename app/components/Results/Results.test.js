import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from '../helpers/stubbeddata.js';
import Results from './Results'

describe('Results', () =>{

  it('should be a div that holds a car', () =>{
    const wrapper = shallow(<Results car = {'Jeep Wrangler'}/>)

    expect(wrapper.find('div').length).toEqual(1)
  })

  it('should display the car in an h2', () =>{
    const wrapper = shallow(<Results car = {'Jeep Wrangler'}/>)

    expect(wrapper.find('h2').length).toEqual(1)
  })

  it('should render the vehicle on the dom', () =>{
    const wrapper = shallow(<Results car = {'Jeep Wrangler'}/>)

    expect(wrapper.find('h2').length).toEqual(1)
    expect(wrapper.find('h2').text()).toBe('Jeep Wrangler')
  })

})
