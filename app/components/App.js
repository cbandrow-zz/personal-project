import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageImport from './ImageImport/ImageImport'
import ImageHolder from './ImageHolder/ImageHolder'
import jsonData from './helpers/jsonData.js'
import key from './helpers/apiKey.js'

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
    let content = this.state.imagePreviewUrl.replace('data:image/jpeg;base64,', '')
    console.log(content, 'content @app/handleImageData')
  }

  sendDataCloudVision(content){
    let newContent = jsonData(content)
    console.log(newContent)
    let results
    fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`,{
      method: 'POST',
      dataType: 'json',
      data: `${newContent}`,
      headers: { 'Content-Type': 'application/json' },
    }).then((resp) => resp.json())
      .then((data) =>{
        console.log(data)
      })
     .catch(err => console.log(err))
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
