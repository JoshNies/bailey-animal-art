import React, { Component } from 'react'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import AdminBanner from '../../AdminBanner'
import Gallery from '../../Gallery'

class Shop extends Component {
  render () {
    return (
      <div className="baa-container">
        <div className="baa-content">
          <BAANavbar/>
          <AdminBanner/>
          <div className="heading">
            <h1>Shop</h1>
            <h2>Artwork for Sale</h2>
          </div>
          <Gallery type="shop"/>
        </div>
        <BAAFooter/>
      </div>
    )
  }
}

export default Shop
