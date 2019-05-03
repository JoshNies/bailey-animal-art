import React, { Component } from 'react'
import BAANavbar from '../../BAANavbar'

class Home extends Component {
  render () {
    return (
      <div>
        <BAANavbar/>
        <div className="heading">
          <h1>Teresa Bailey</h1>
          <h2>Pet Portrait Artist</h2>
        </div>
      </div>
    )
  }
}

export default Home;
