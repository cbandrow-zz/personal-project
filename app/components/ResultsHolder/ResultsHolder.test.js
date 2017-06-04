import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from '../helpers/stubbeddata.js';
import ResultsHolder from './ResultsHolder'

describe('Results Holder', () =>{

  const mockCars = ['Mazda Miata', 'VW GTI', 'Chevrolet Camaro']
  let loadingStatus = false
  let error = false

  it('should be a section that holds results', () =>{
    const wrapper = shallow(<ResultsHolder cars = {mockCars} loadingStatus = {loadingStatus} error = {error}/>)

    expect(wrapper.find('section').length).toEqual(1)
  })

  it('should return several results', () =>{
    const wrapper = shallow(<ResultsHolder cars = {mockCars} loadingStatus = {loadingStatus} error = {error}/>)

    expect(wrapper.find('Results').length).toEqual(3)
  })

  it('should display a loading message when loading', () =>{
    loadingStatus = true;
    let cars = []
    const wrapper = shallow(<ResultsHolder cars = {cars} loadingStatus = {loadingStatus} error = {error}/>)

    expect(wrapper.find('h3').text()).toBe('Loading Results...')
    expect(wrapper.find('img').length).toEqual(1)
  })

  it('should return different answer strings', () =>{
    const wrapper = shallow(<ResultsHolder cars = {mockCars} loadingStatus = {loadingStatus} error = {error}/>)
    expect(wrapper.find('Results').length).toEqual(3)
    expect(wrapper.find('h3').first().text()).toBe('Your uploaded image may one of the following Models or Trims: ')
  })

  it('should return different answer strings when there is One Car', () =>{
    const wrapper = shallow(<ResultsHolder cars = {['Ferrar 458']} loadingStatus = {loadingStatus} error = {error}/>)

    expect(wrapper.find('Results').length).toEqual(1)
    expect(wrapper.find('h3').first().text()).toBe('The car is: ')
  })

  it('should return an error message', () =>{

    error = true;

    const wrapper = shallow(<ResultsHolder cars = {[]} loadingStatus = {loadingStatus} error = {error}/>)
    expect(wrapper.find('h3').first().text()).toBe('Please Try Again.')
  })

})
