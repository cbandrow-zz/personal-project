import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageImport from './ImageImport/ImageImport'

export default class App extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
  }

  render() {
    return (
      <div>
        Upload an Image of a Car. We'll do the rest.
        <ImageImport/>
      </div>
    )
  }
}
