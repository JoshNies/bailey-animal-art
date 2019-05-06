import React, { Component } from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
//import Button from 'react-bulma-components/lib/components/button'
import { BarLoader } from 'react-spinners'
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
          //const { user } = value
          return (
            <div className="baa-container">
              <div className="baa-content">
                <BAANavbar/>

                { this.state.loadingImages &&
                  <div className="details-image-loading">
                    <BarLoader
                      widthUnit={"%"}
                      width={100}
                      heightUnit={"rem"}
                      height={0.3}
                      color={"#6444ba"}
                      />
                  </div>
                }

                {/* Item Details */}
                { this.state.item !== null && this.state.item !== undefined &&
                  <Columns className="details-container">
                    <Columns.Column></Columns.Column>
                    <Columns.Column className="details-image-column">
                      {
                        (() => {
                          if (!this.state.loadingImages) {
                            // Finished loading
                            if (this.state.refImageSrc !== null &&
                              this.state.refImageSrc !== undefined
                            ) {
                              // Show image comparison
                              console.log("Image comparison!")
                              return (
                                <div className="details-image-comparison">
                                  <ReactCompareImage
                                    leftImage={this.state.refImageSrc}
                                    rightImage={this.state.mainImageSrc}
                                    />
                                  <p className="details-image-comparison-subtitle">
                                    slide to compare
                                  </p>
                                </div>
                              )
                            } else {
                              // Only show main image
                              return (
                                <div className="details-image">
                                  <Img
                                    src={this.state.mainImageSrc}
                                    alt="gallery item image"
                                    />
                                </div>
                              )
                            }
                          }
                        })()
                      }
                    </Columns.Column>
                    <Columns.Column className="details-block">
                      <h1>{this.state.item.title}</h1>

                      {/* Show commision subtitle if not for sale */}
                      { (this.state.item.price === null ||
                        this.state.item.price === undefined ||
                        this.state.item.price <= 0
                      ) &&
                        <p className="details-subtitle">commission</p>
                      }

                      <p className="details-desc">{this.state.item.desc}</p>

                      {/* Dimensions */}
                      { this.state.item.width !== null &&
                        this.state.item.width !== undefined &&
                        this.state.item.width > 0 &&
                        this.state.item.height !== null &&
                        this.state.item.height !== undefined &&
                        this.state.item.height > 0 &&
                        <p className="details-dim">
                          dimensions:
                          <span className="details-dim-amount">
                            {this.state.item.width} x {this.state.item.height} in
                          </span>
                        </p>
                      }

                      {/* Thickness */}
                      { this.state.item.thickness !== null &&
                        this.state.item.thickness !== undefined &&
                        this.state.item.thickness > 0 &&
                        <p className="details-thickness">
                          thickness:
                          <span className="details-thickness-amount">
                            {this.state.item.thickness} in
                          </span>
                        </p>
                      }
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
