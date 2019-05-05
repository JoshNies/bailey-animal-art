import React, { Component } from 'react'
import Fire from '../../config/Firebase'

class GalleryItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: ''
    }
  }

  componentDidMount() {
    // Fetch image from storage
    this.fetchImage()
  }

  fetchImage() {
    const storage = Fire.storage().ref('')
    storage.child(this.props.imagePath).getDownloadURL()
      .then((url) => {
        this.setState({ imageSrc: url })
      })
  }

  render () {
    return (
      <div className="gallery-item">
        <img src={this.state.imageSrc} alt="gallery item"/>
      </div>
    )
  }
}

export default GalleryItem
