import React, { Component } from 'react'

class GalleryItem extends Component {
  render () {
    return (
      <div className="gallery-item">
        <img src={this.props.image}/>
      </div>
    )
  }
}

export default GalleryItem
