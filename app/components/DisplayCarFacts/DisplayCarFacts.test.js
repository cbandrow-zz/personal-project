import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from '../helpers/stubbeddata.js';
import DisplayCarFacts from './DisplayCarFacts'

describe('DisplayCarFacts', () =>{

  let stubCarData = {
    make: 'Mazda',
    model: 'MX-5 Miata',
    years: [2008, 2009, 2010],
    link: 'website.com',
    details: 'car is cool, convertible, fun to drive',
  }

  it('should render a div that holds car data', () =>{
    const wrapper = shallow(<DisplayCarFacts carData = {stubCarData}/>)

    expect(wrapper.find('div').length).toEqual(1)
  })

  it('should an h2 which holds a make and model', () =>{
    const wrapper = shallow(<DisplayCarFacts carData = {stubCarData}/>)

    expect(wrapper.find('h2').length).toEqual(1)
    expect(wrapper.find('h2').text()).toEqual('Mazda MX-5 Miata')
  })

  it('should render years', () =>{
    const wrapper = shallow(<DisplayCarFacts carData = {stubCarData}/>)

    expect(wrapper.find('p').first().text()).toEqual('Years Manufactured: 2008, 2009, 2010 ')
    expect(wrapper.find('span').first().text()).toEqual('2008, ')
  })

  it('should render details', () =>{
    const wrapper = shallow(<DisplayCarFacts carData = {stubCarData}/>)

    expect(wrapper.find('.details').length).toEqual(1)
    expect(wrapper.find('.details').text()).toEqual('car is cool, convertible, fun to drive')
  })

  it('should render a link', () =>{
    const wrapper = shallow(<DisplayCarFacts carData = {stubCarData}/>)

    expect(wrapper.find('p').last().length).toEqual(1)
    expect(wrapper.find('p').last().text()).toEqual('To find out more, visit Edumunds Mazda and MX-5 Miata page')

  })
})
