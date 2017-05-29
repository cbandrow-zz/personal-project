import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageImport from './ImageImport/ImageImport'
import ImageHolder from './ImageHolder/ImageHolder'
import HelperCleaner from './helpers/HelperCleaner'
import jsonData from './helpers/jsonData.js'
import key2 from './helpers/apiKey.js'
import $ from 'jquery'
import stubData from './helpers/stubbeddata.js'
import vehicleData from './helpers/vehicleData.js'

export default class App extends Component {
  constructor(){
    super()
    this.Helper = new HelperCleaner()
    this.state = {
      imagePreviewUrl: '',
      vehicleData: {},
      results: ''
    }
  }

  componentDidMount() {
    let results = this.cleanVehicleData()
    this.setState({
      vehicleData: results,
    })
    console.log(results)
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
        resolve('promise resolved');
      }, 1500);
    })
    statePromise.then(() =>{
      content = this.state.imagePreviewUrl.replace('data:image/jpeg;base64,', '')
      this.sendDataCloudVision(content)
    })
  }

  cleanVehicleData(){
    let reducedData = vehicleData.makes.reduce((acc, make) =>{
      if(!acc[make.name]){
        acc[make.name] = {
          name: make.name,
          models: make.models.map((model) =>{
            return {
              name: model.name,
              id: model.id
            }
          })
        }
      }
      return acc
    }, [])
    return reducedData
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

       results = data
       console.log(results, 'cleaned data')
     })
     .catch(err => console.log(err))


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
