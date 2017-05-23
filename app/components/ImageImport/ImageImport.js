import React, { Component } from 'react'
import { render } from 'react-dom'
import cloudVisionRequest from '../helpers/cloudVisionRequest'

export default class ImportImage extends Component {
  constructor(){
    super()

    this.state ={

    }
  }

  render(){
    return(
      <div>
        <form id="fileform">
          <input id="fileInput" type="file" name="fileField"/>
          <input type="submit" name="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
