import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageImport from './ImageImport/ImageImport'
import ImageHolder from './ImageHolder/ImageHolder'
import jsonData from './helpers/jsonData.js'
import key2 from './helpers/apiKey.js'

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
      console.log('during promise')
      this.setState({
        imagePreviewUrl: inputState.imagePreviewUrl,
      })
      setTimeout(function(){
        console.log('resolved promise')
        resolve("received Base64 image");
      }, 1500);
    })
    statePromise.then(() =>{
      content = this.state.imagePreviewUrl.replace('data:image/jpeg;base64,', '')
      this.sendDataCloudVision(content)
    })
  }

  sendDataCloudVision(content){
    let newContent = jsonData(content)
    let results
    fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key2}`,{
      method: 'POST',
      
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      data: JSON.stringify(newContent),
    }).then((resp) => {
      console.log(resp, 'response from google')
      return resp.json()
    })
      .then((data) =>{
        console.log(data, 'supposedly clean data')
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
