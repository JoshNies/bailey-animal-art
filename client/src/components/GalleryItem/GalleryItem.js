import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import { PulseLoader } from 'react-spinners'
import { Consumer } from '../MyContext'
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

  fetchImage = () => {
    const storage = Fire.storage().ref('')
    storage.child(this.props.imagePath).getDownloadURL()
      .then((url) => {
        this.setState({ imageSrc: url })
      })
  }

  // Get class name for container div based on featured and user status
  getClassName = (user) => {
    if (this.props.featured && user) {
      return "gallery-item featured"
    }

    return "gallery-item"
  }

  render () {
    return (
      <Consumer>
        { value => {
          const { user } = value
          const containerClass = this.getClassName(user)
          return (
            <div className={containerClass}>
              <Link to={'/gallery/' + 'ITEM_ID_HERE'}>
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
              </Link>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default GalleryItem
