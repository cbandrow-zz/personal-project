import React, { Component } from 'react'
import { render } from 'react-dom'
import key from '../helpers/imageKey'
import Helper from '../helpers/helper'

export default class DisplayCarFacts extends Component{
  constructor(){
    super()
    this.helper = new Helper()
    this.state = {
      value: '',
      selectedYear: '',
      image: '',
    }
  }

  componentDidMount(){
    this.getImage(this.props.carData)
  }

  getImage(carData){
    let year = this.state.value || carData.years[0]
    fetch(`https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${year}+${carData.make}+${carData.model}&count=5&mkt=en-us`,{
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key':`${key}`,
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then((data) =>{
      console.log('original data', data)
       const reducedImages = this.helper.reduceImageResponse(data)
       return reducedImages
    })
    .then(reducedImages => {
      this.setState({
        image: reducedImages.replace(/["]+/g, ''),
      })
    })
    .catch(err => console.log(err))
  }

  handleSelectChange(e){
    this.setState({
      value: e.target.value
    });
  }

  render(){
    let carData = this.props.carData
    return (
      <div>
        <h2>{carData.make} {carData.model}</h2>
        <div className = "selected-image"><img src = {this.state.image}/></div>
        <div className = "selected-content">
          <section className = "years-container">
            <label>Select a Vehicle Year</label>
            <select
              value={this.state.value} onChange={(e) => this.handleSelectChange(e)}>
              {carData.years.map((year, i) => {
                return (
                  <option key={i}
                    value={year}>{year}</option>
                  )
                })
              }
            </select>
            <button onClick = {()=>{this.getImage(carData)}}>Display Vehicle by Year</button>
          </section>
          <section className = "info-container">
            <p className = "details">{carData.details}</p>
            <p>To find out more, visit <a href = {carData.link}>Edumunds {carData.make} and {carData.model} page</a></p>
          </section>
        </div>

      </div>
    )
  }
}
