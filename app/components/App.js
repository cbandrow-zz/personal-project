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
    let content
    let statePromise = new Promise((resolve, reject)=>{
      console.log(this.state, 'during promise')
      this.setState({
        imagePreviewUrl: inputState.imagePreviewUrl,
      })
      setTimeout(function(){
        console.log(this.state, 'resolved promise')
        resolve("received Base64 image");
      }, 2200);
    })
    statePromise.then(() =>{
      content = this.state.imagePreviewUrl.replace('data:image/jpeg;base64,', '')
      console.log(content, 'content @app/handleImageData')
      this.sendDataCloudVision(content)
    })
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
