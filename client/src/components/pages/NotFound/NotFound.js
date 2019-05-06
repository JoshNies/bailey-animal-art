import React, { Component } from 'react'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'

class NotFound extends Component {
  render () {
    return (
      <div className="baa-container">
        <div className="baa-content">
          <BAANavbar/>
          <div className="heading">
            <h1>404</h1>
            <h2>Nothing here.</h2>
          </div>
        </div>
        <BAAFooter/>
      </div>
    )
  }
}

export default NotFound
