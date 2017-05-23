import React, { Component } from 'react'
import { render } from 'react-dom'

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
        Upload an Image of a Car
        <form id="fileform" action="">
		      <input id="fileInput" type="file" name="fileField"/>
		      <input type="submit" name="submit" value="Submit"/>
	      </form>
      </div>
    )
  }
}
