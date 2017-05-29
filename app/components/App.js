import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageImport from './ImageImport/ImageImport'
import ImageHolder from './ImageHolder/ImageHolder'
import Helper from './helpers/helper'
import jsonData from './helpers/jsonData.js'
import key2 from './helpers/apiKey.js'
import $ from 'jquery'
import stubData from './helpers/stubbeddata.js'
import vehicleData from './helpers/vehicleData.js'

export default class App extends Component {
  constructor(data){
    super()
    this.helper = new Helper(data)
    this.state = {
      imagePreviewUrl: '',
      apiResults: [],
      completeVehicles: [],
      thing: ''
    }
  }

  componentDidMount(){
    let results = this.helper.cleanVehicleData(vehicleData)
    this.setState({
      completeVehicles: this.helper.cleanVehicleData(vehicleData),
    })
  }

  handleImageData(inputState){
    let content
    let statePromise = new Promise((resolve, reject)=>{
      console.log('loading...')
      this.setState({
        imagePreviewUrl: inputState.imagePreviewUrl,
      })
      setTimeout(function(){
        resolve('promise resolved');
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
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(newContent),
     }).then((resp) => resp.json())
       .then((data) =>{
        results = this.helper.cleanResponseData(data)
        console.log('...done')
        return results
     })
     .then((results =>{
       this.setState({
         apiResults: results
       })
     }))
     .catch(err => console.log(err))
    // let newResults = this.cleanResponseData(stubData)
    // console.log(newResults, "at send data")
  }

  displayComponents(){
    if(this.state.imagePreviewUrl){
      return (
        <div>
          <ImageImport handleImageData = {this.handleImageData.bind(this)}/>
          <ImageHolder url = {this.state.imagePreviewUrl}/>
        </div>
      )
    }else {
      return(
        <div>
          <ImageImport handleImageData = {this.handleImageData.bind(this)}/>
        </div>
      )
    }
  }

  render() {
    return (
      <section>
        {this.displayComponents()}
      </section>
    )
  }
}
