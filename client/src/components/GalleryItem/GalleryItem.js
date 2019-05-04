import React, { Component } from 'react'

class GalleryItem extends Component {
  render () {
    return (
      <div className="gallery-item">
        <img src={this.props.image} alt="gallery item"/>
      </div>
    )
  }
}

export default GalleryItem
