import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from '../helpers/stubbeddata.js';
import LandingPage from './LandingPage'

describe('Landing Page', () =>{

  it('should render as a section to hold a video and its parent', () =>{
    const wrapper = shallow(<LandingPage/>)

    expect(wrapper.find('section').length).toEqual(1)
  })

  it('should render a video', () =>{
    const wrapper = shallow(<LandingPage/>)

    expect(wrapper.find('video').length).toEqual(1)
  })

  it('should have a div overlay container on top of the video', () =>{
    const wrapper = shallow(<LandingPage/>)

    expect(wrapper.find('.overlay').length).toEqual(1)
  })

  it('should have an h2 overlay', () =>{
    const wrapper = shallow(<LandingPage/>)

    expect(wrapper.find('h2').length).toEqual(1)
    expect(wrapper.find('h2').text()).toEqual('Find out the make and model of a car with the snap of a photo')
  })
})
