import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageImport from './ImageImport/ImageImport'
import ImageHolder from './ImageHolder/ImageHolder'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      imagePreviewUrl: ''
    }
  }

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
  }

  handleImageData(inputState){
    this.setState({
      imagePreviewUrl: inputState.imagePreviewUrl,
    })
  }

  render() {
    return (
      <div>
        <ImageImport handleImageData = {this.handleImageData.bind(this)}/>
        <ImageHolder url = {this.state.imagePreviewURL}/>
      </div>
    )
  }
}
