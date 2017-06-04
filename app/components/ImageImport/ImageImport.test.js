import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from '../helpers/stubbeddata.js';
import ImageImport from './ImageImport'


describe('Image Import', () =>{
  const mockFile = 'ferrari.jpg'
  const mockFileDetails = {file: {
    lastModified: 149582,
    lastModifiedDate: 'Fri May 26 2017',
    name: 'ferrari.jpg',
    size: 1734905,
    type: 'image/jpeg'
  }}


  it('should have an empty state on default', () =>{
    const mockFn = jest.fn()
    const wrapper = shallow(<ImageImport handleImageData = {mockFn} />)

    expect(wrapper.state().file).toEqual('')
    expect(wrapper.state().imagePreviewUrl).toEqual('')
  })

  it('should have two inputs: one for files and one for submit', () =>{
    const mockFn = jest.fn()
    const wrapper = shallow(<ImageImport handleImageData = {mockFn} />)

    const fileInput = wrapper.find('#fileInput')
    const submitBtn = wrapper.find('#submit-btn')

    expect(fileInput.length).toEqual(1)
    expect(submitBtn.length).toEqual(1)
  })

  it('should enable a file to be uploaded and stored in state', () =>{
    const mockFn = jest.fn()
    const wrapper = shallow(<ImageImport handleImageData = {mockFn} />)

    const fileInput = wrapper.find('#fileInput')

    fileInput.simulate('click')
    wrapper.setState({
      file: mockFileDetails,
      imagePreviewUrl: 'data:image/jpeg;base64,/bunchofcharactersandstuffhere'
    })
    expect(wrapper.state().file).toEqual(mockFileDetails)
    expect(wrapper.state().imagePreviewUrl).toEqual('data:image/jpeg;base64,/bunchofcharactersandstuffhere')
  })

  it('should run a function on button submit', () =>{
    const mockFn = jest.fn()
    const wrapper = shallow(<ImageImport handleImageData = {mockFn} />)

    const fileInput = wrapper.find('#fileInput')
    const submitBtn = wrapper.find('#submit-btn')

    fileInput.simulate('click')
    wrapper.setState({
      file: mockFileDetails,
      imagePreviewUrl: 'data:image/jpeg;base64,/bunchofcharactersandstuffhere'
    })

    submitBtn.simulate('click', { preventDefault: () => {}})

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledTimes(1)

  })
})
