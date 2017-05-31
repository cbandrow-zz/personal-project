import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageImport from './ImageImport/ImageImport'
import ImageHolder from './ImageHolder/ImageHolder'
import ResultsHolder from './ResultsHolder/ResultsHolder'
import Helper from './helpers/helper'
import jsonData from './helpers/jsonData.js'
import key2 from './helpers/apiKey.js'
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
      compareResults: [],
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
      let compared = this.helper.getPotentialMakes(results, this.state.completeVehicles)
      this.setState({
        compareResults: compared,
      })
      console.log(compared)
     }))
     .catch(err => console.log(err))
    // let newResults = this.cleanResponseData(stubData)
    // console.log(newResults, "at send data")
  }

  displayComponents(){
    if(this.state.imagePreviewUrl){
      return (
        <div className = 'image-holder'>
          <ImageHolder url = {this.state.imagePreviewUrl}/>
        </div>
      )
    }
  }

  moveUpload(){
    if(!this.state.imagePreviewUrl){
      return 'no-upload'
    } else {
      return 'display-upload'
    }
  }

  removeUpload(){
    if(this.state.imagePreviewUrl){
      return 'no-upload'
    } else {
      return 'display-upload'
    }
  }

  render() {
    return (
      <main>
        <header>
          <h1>Car-Tographer</h1>
          <div className = {`${this.moveUpload()} header-upload`}>
            <ImageImport handleImageData = {this.handleImageData.bind(this)}/>
          </div>
        </header>
        <section className = "main-content">
          <div className = {`${this.removeUpload()} body-upload`}>
            <ImageImport handleImageData = {this.handleImageData.bind(this)}/>
          </div>
          {this.displayComponents()}
          <ResultsHolder cars = {this.state.compareResults}/>
        </section>
      </main>
    )
  }
}
