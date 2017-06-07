import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from './helpers/stubbeddata.js';
import App from './App.js';
import key2 from './helpers/apiKey'
import Helper from './helpers/helper'
import LandingPage from './LandingPage/LandingPage'

describe('Main App Tests', () =>{

  afterEach(() =>{
    expect(fetchMock.calls().unmatched).toEqual([])
    fetchMock.restore()
  })

  const resolveAfter2Seconds = () => {
    return new Promise (resolve => {
      setTimeout(() =>{
        resolve();
      }, 2000)
    })
  }

  it('should have a default state', () =>{
    const wrapper = shallow(<App/>)

    const expectedState = {
      imagePreviewUrl: '',
      apiResults: [],
      completeVehicles: [],
      compareResults: [],
      loadingStatus: false,
      error: '',
      makeMatches: [],
      carData: '',
    }

    expect(wrapper.state()).toEqual(expectedState)
  })

  it('should get a bunch of vehicles when the componentMounts', () =>{
    const wrapper = mount(<App/>)
    const expectedState = { name: 'A5', id: 'Audi A5' }

    expect(wrapper.state().completeVehicles.Audi.models[8]).toEqual(expectedState)
  })

  it('should make a call to Google Vision API', () =>{

    const wrapper = mount(<App/>)
    const submitBtn = wrapper.find('#submit-btn')
    submitBtn.simulate('click')

    fetchMock.get("https://vision.googleapis.com/v1/images:annotate?key=${key2}", { status: 200, body: stubData})

    let reducedData = wrapper.node.helper.cleanResponseData(stubData)

    const expectedData = ["2009 Volkswagen GTI", "Volkswagen", "Car", "Volkswagen Golf Mk5", "Volkswagen Golf GTI", "Volkswagen R32", "Volkswagen Group", "Car tuning", "Golf", "Wallpaper", "Volkswagen Golf Mk6", "Rim", "Volkswagen Golf", "Volkswagen GTI"]

    wrapper.setState({
      apiResults: reducedData
    })

    expect(wrapper.state().apiResults).toEqual(expectedData)
  })

  it('should make a call and return matching makes', () =>{
    const wrapper = mount(<App/>)
    const submitBtn = wrapper.find('#submit-btn')
    submitBtn.simulate('click')

    fetchMock.get("https://vision.googleapis.com/v1/images:annotate?key=${key2}", { status: 200, body: stubData})

    let reducedData = wrapper.node.helper.cleanResponseData(stubData)
    let makesData = wrapper.node.helper.getPotentialMakes(reducedData, wrapper.state().completeVehicles)

    const expectedData = [ '2009 Volkswagen GTI','Volkswagen','Volkswagen Golf Mk5','Volkswagen Golf GTI','Volkswagen R32','Volkswagen Group','Volkswagen Golf Mk6','Volkswagen Golf','Volkswagen GTI' ]

    wrapper.setState({
      apiResults: makesData[1]
    })

    expect(makesData[0]).toEqual(['Volkswagen'])
    expect(makesData[1]).toEqual(expectedData)
  })

  it('should make a call and return matching models', () =>{
    const wrapper = mount(<App/>)
    const submitBtn = wrapper.find('#submit-btn')
    submitBtn.simulate('click')

    fetchMock.get("https://vision.googleapis.com/v1/images:annotate?key=${key2}", { status: 200, body: stubData})

    let reducedData = wrapper.node.helper.cleanResponseData(stubData)
    let makesData = wrapper.node.helper.getPotentialMakes(reducedData, wrapper.state().completeVehicles)

    wrapper.setState({
      apiResults: makesData[1]
    })

    let modelsData = wrapper.node.helper.getPotentialModels(makesData[1], wrapper.state().completeVehicles, makesData[0])

    wrapper.setState({
      compareResults: modelsData
    })
    expect(wrapper.state().compareResults).toEqual([ 'Volkswagen GTI','Volkswagen Golf','Volkswagen Golf GTI','Volkswagen R32' ])

  })

  it('should display components depending on whats in state', () =>{
    const wrapper = mount(<App/>)

    wrapper.setState({
      imagePreviewUrl: 'imagestring',
    })

    fetchMock.get("https://vision.googleapis.com/v1/images:annotate?key=${key2}", { status: 200, body: stubData})

    expect(wrapper.find('.content-holder').length).toEqual(1)
    expect(wrapper.find('ImageHolder').length).toEqual(1)
    expect(wrapper.find('ResultsHolder').length).toEqual(1)
  })

  it('should set state if there is an error', () =>{
    const wrapper = mount(<App/>).instance()
    wrapper.setState({
      loadingStatus: false,
      compareResults: []
    })
    wrapper.determineError()

    expect(wrapper.state.error).toEqual(true)
  })

  it('should render the LandingPage component', () =>{
    const wrapper = shallow(<App/>)

    expect(wrapper.find('LandingPage').length).toEqual(1)
  })

  it('should render inputs in the header if content has already been uploaded.', () =>{
    const wrapper = shallow(<App/>)
    wrapper.setState({
      imagePreviewUrl: 'ImageURL',
    })
    expect(wrapper.find('.header-upload').length).toEqual(1)
  })

  it('should display carInfo', () =>{
    const wrapper = shallow(<App/>)
    let stubCarData = {
      make: 'Mazda',
      model: 'MX-5 Miata',
      years: [2008, 2009, 2010],
      link: 'website.com',
      details: 'car is cool, convertible, fun to drive',
    }

    wrapper.setState({
      carData: stubCarData
    })

    expect(wrapper.find('.car-facts').length).toEqual(0);
  })

})
