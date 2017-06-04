import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from '../helpers/stubbeddata.js';
import ImageHolder from './ImageHolder'

describe('Image Holder', () =>{
  const src = 'http://media.caranddriver.com/images/12q1/435354/2012-mazda-mx-5-miata-special-edition-photos-and-info-news-car-and-driver-photo-440297-s-450x274.jpg'

  it('should render as a div to hold images', () =>{
    const wrapper = shallow(<ImageHolder src = {src}/>)

    expect(wrapper.find('div').length).toEqual(1)
  })

  it('should render the image', () =>{
    const wrapper = shallow(<ImageHolder src = {src}/>)

    expect(wrapper.find('img').length).toEqual(1)
  })
})
