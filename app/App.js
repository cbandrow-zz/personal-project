import React, { Component } from 'react'
import { render } from 'react-dom'


class App extends Component {
  componentDidMount() {
    // INSERT API CALL TO YOUR INTERNAL API
  }

  render() {
    return (
      <div>Hello World</div>
    )
  }
}

render(<App />, document.getElementById('main'))
