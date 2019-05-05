import React, { Component } from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
import Button from 'react-bulma-components/lib/components/button'
import { PulseLoader } from 'react-spinners'
import ReactCompareImage from 'react-compare-image'
import Img from 'react-image'
import { Consumer } from '../../MyContext'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import Fire from '../../../config/Firebase'

class GalleryItemDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: this.props.match.params.itemId,
      item: null,
      notFound: false,
      loadingImages: true,
      mainImageSrc: null,
      refImageSrc: null
    }
  }

  componentDidMount() {
    // Fetch item
    this.fetchItem()
  }

  fetchItem = () => {
    if (this.state.itemId === null || this.state.itemId === undefined ||
      this.state.itemId === ''
    ) { return }

    var firestore = Fire.firestore()
    firestore.collection('gallery').doc(this.state.itemId).get()
      .then(doc => {
        // Redirect to Not Found page if doc doesn't exist
        if (!doc.exists) {
          this.setState({ notFound: true })
          return
        }

        this.setState({ item: doc.data() })

        // Fetch main image
        this.fetchMainImage()
      })
      .catch(e => {
        console.log("Gallery item fetching error: " + e)
      })
  }

  fetchMainImage = () => {
    const storage = Fire.storage().ref('')
    storage.child(this.state.item.image).getDownloadURL()
      .then((url) => {
        this.setState({ mainImageSrc: url })

        // Fetch reference image
        if (this.state.item.refImage !== null &&
          this.state.item.refImage !== undefined &&
          this.state.item.refImage !== ''
        ) {
          this.fetchRefImage()
        } else {
          // Finished loading if item has no reference image
          this.setState({ loadingImages: false })
        }
      })
  }

  fetchRefImage = () => {
    const storage = Fire.storage().ref('')
    storage.child(this.state.item.refImage).getDownloadURL()
      .then((url) => {
        this.setState({ refImageSrc: url, loadingImages: false })
      })
  }

  render () {
    return (
      <Consumer>
        {value => {
          const { user } = value
          return (
            <div className="baa-container">
              <div className="baa-content">
                <BAANavbar/>

                {/* Item Details */}
                { this.state.item !== null && this.state.item !== undefined &&
                  <Columns>
                    <Columns.Column></Columns.Column>
                    <Columns.Column className="details-image-column">
                      {
                        (() => {
                          if (this.state.loadingImages) {
                            // Loading
                            return (
                              <PulseLoader
                                sizeUnit={"rem"}
                                size={1}
                                color={"#7D56E6"}
                                />
                            )
                          } else {
                            // Finished loading
                            if (this.state.refImageSrc !== null &&
                              this.state.refImageSrc !== undefined
                            ) {
                              // Show image comparison
                              console.log("Image comparison!")
                              return (
                                <div className="details-image">
                                  <ReactCompareImage
                                    leftImage={this.state.refImageSrc}
                                    rightImage={this.state.mainImageSrc}
                                    />
                                </div>
                              )
                            } else {
                              // Only show main image
                              return (
                                <Img
                                  src={this.state.mainImageSrc}
                                  alt="gallery item image"
                                  />
                              )
                            }
                          }
                        })()
                      }
                    </Columns.Column>
                    <Columns.Column className="details-block">
                      <h1>{this.state.item.title}</h1>
                      <p>{this.state.item.desc}</p>
                    </Columns.Column>
                    <Columns.Column></Columns.Column>
                  </Columns>
                }

                {/* Not Found */}
                { this.state.notFound &&
                  <div>
                    <h1>Not Found</h1>
                  </div>
                }
              </div>
              <BAAFooter/>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default GalleryItemDetails
