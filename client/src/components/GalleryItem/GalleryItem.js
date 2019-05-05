import React, { Component } from 'react'
import Img from 'react-image'
import Fire from '../../config/Firebase'
import { PulseLoader } from 'react-spinners'

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

  fetchImage = () => {
    const storage = Fire.storage().ref('')
    storage.child(this.props.imagePath).getDownloadURL()
      .then((url) => {
        this.setState({ imageSrc: url })
      })
  }

  render () {
    return (
      <div className="gallery-item">
        <Img
          src={this.state.imageSrc}
          alt="gallery image"
          loader={
            <PulseLoader
              sizeUnit={"rem"}
              size={1}
              color={"#7D56E6"}
              />
          }
          />
      </div>
    )
  }
}

export default GalleryItem
