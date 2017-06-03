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
      loadingStatus: false,
      error: '',
    }
  }

  componentDidMount(){
    let results = this.helper.cleanVehicleData(vehicleData)
    this.setState({
      error: false,
      completeVehicles: this.helper.cleanVehicleData(vehicleData),
    })
  }

  handleImageData(inputState){
    let content
    let statePromise = new Promise((resolve, reject)=>{
      console.log('loading...')
      this.setState({
        error: false,
        apiResults: [],
        compareResults: [],
        loadingStatus: true,
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
     .then((results) =>{
      let returnMatches = this.helper.getPotentialMakes(results, this.state.completeVehicles)

      this.setState({
        apiResults: returnMatches[1]
      })

      let makes = returnMatches[0].map((makeData) =>{
        return makeData
      })
      return makes
    })
    .then((makes) =>{
      let modelMatches = this.helper.getPotentialModels(this.state.apiResults, this.state.completeVehicles, makes)

      this.setState({
        compareResults: modelMatches,
        loadingStatus: false,
      })
    })
     .then(data => this.determineError())
     .catch(err => console.log(err))
  }

  displayComponents(){
    if(this.state.imagePreviewUrl){
      return (
        <div className = 'content-holder'>
          <ImageHolder url = {this.state.imagePreviewUrl}/>
          <ResultsHolder cars = {this.state.compareResults}
          loadingStatus = {this.state.loadingStatus} error = {this.state.error}/>
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

  determineError(){
    if(this.state.loadingStatus === false && this.state.compareResults.length < 1 && this.state.apiResults){
      console.log("error?")
      this.setState({
        error: true,
      })
    } else {
      this.setState({
        error: false,
      })
      console.log("loading complete")
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
        </section>
      </main>
    )
  }
}
