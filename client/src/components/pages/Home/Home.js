import React, { Component } from 'react'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import AdminBanner from '../../AdminBanner'
import Gallery from '../../Gallery'

class Home extends Component {
  render () {
    return (
      <div className="baa-container">
        <div className="baa-content">
          <BAANavbar/>
          <AdminBanner/>
          <div className="heading">
            <h1>Teresa Bailey</h1>
            <h2>Pet Portrait Artist</h2>
          </div>
          <Gallery type="home"/>
        </div>
        <BAAFooter/>
      </div>
    )
  }
}

export default Home
