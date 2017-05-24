import React, { Component } from 'react'
import { render } from 'react-dom'
import cloudVisionRequest from '../helpers/cloudVisionRequest'

export default class ImportImage extends Component {
  constructor(){
    super()
    this.visionAPI = new cloudVisionRequest()
    this.state ={
      file: ''
    }
  }

  render(){
    return(
      <div>
        <form id="fileform">
          <input id="fileInput" type="file" name="fileField" onChange = {(e) =>{
             console.log(e.target.value)
             this.setState({file: e.target.value})
           }}/>
          <input onClick = {(e) =>{
            e.preventDefault();
            e.stopPropagation();
            console.log(this.visionAPI)
            this.visionAPI.uploadFiles(e, this.state.file)
          }}
          type="submit" name="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
