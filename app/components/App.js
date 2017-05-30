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

  compareData(apiData, carData){
    let carDataKeys = Object.keys(carData)

    let matches = []
    apiData.forEach((data, i) =>{
       carDataKeys.forEach((make, i) =>{
        if(data != null && data.toLowerCase().includes(make.toLowerCase()) ){
          matches.push(make)
        }
      })
    })

    let reducedMatches = matches.filter((match, i, arr) => {
	     return arr.indexOf(match) === i;
    })

    let results = []
    apiData.forEach((data, i) =>{
      reducedMatches.forEach((match)=>{
        let formatData = data.toLowerCase().replace(`${match.toLowerCase()}`, '')
        carData[match].models.forEach((model)=>{
          let formatModelName = model.name.toLowerCase()
          let formatModelId = model.id.toLowerCase()

          if(formatData.includes(formatModelName)){
            results.push(model.id)
          }
        })
      })
     })
    //  console.log(results)

     let reducedResults = results.filter((result, i, arr) =>{
       return arr.indexOf(result) === i;
     })
     console.log(reducedResults)
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
      let compared = this.compareData(results, this.state.completeVehicles)
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
