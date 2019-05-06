import React, { Component } from 'react'
import {
  Field,
  Control,
  Label,
  Input,
  Textarea,
  Checkbox
} from 'react-bulma-components/lib/components/form'
import Box from 'react-bulma-components/lib/components/box'
import Message from 'react-bulma-components/lib/components/message'
import Columns from 'react-bulma-components/lib/components/columns'
import Button from 'react-bulma-components/lib/components/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { BarLoader } from 'react-spinners'
import ReactCompareImage from 'react-compare-image'
import Img from 'react-image'
import { Consumer } from '../../MyContext'
import AdminBanner from '../../AdminBanner'
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
      refImageSrc: null,
      admin: {
        loading: false,
        editedItem: {
          image: null,
          refImage: null,
          title: null,
          desc: null,
          sold: null,
          price: null,
          width: null,
          height: null,
          thickness: null,
          testimonial: null,
          testimonialAuthor: null,
          featuredOrder: null,
          timestamp: null
        },
        editedImage: null,
        editedRefImage: null,
        disableImageField: false,
        disableRefImageField: false,
        editedItemIsFeatured: false
      },
      error: null,
      updateSuccessful: false
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
        if (!doc.exists) {
          this.setState({ notFound: true, loadingImages: false })
          return
        }

        let admin = this.state.admin
        admin.editedItem = doc.data()
        this.setState({ item: doc.data(), admin })

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

  onChangeItemImage = evt => {
    let admin = this.state.admin
    admin.editedImage = evt.target.files[0]

    // Check and prepare to upload image immediately
    if (admin.editedImage !== null && admin.editedImage !== undefined) {
      admin.loading = true
    }

    this.setState({ admin })

    // Upload main image
    if (admin.loading) {
      const storage = Fire.storage()
      let file = admin.editedImage
      const imageRef = storage.ref('gallery/' + this.state.item.title + "-main")
      let task = imageRef.put(file)
      let imagePath = imageRef.fullPath
      task.on('state_changed',
        (snapshot) => {},

        (e) => {
          console.log("Main image upload error: " + e)
          this.setState({ error: "Something went wrong, please try again later." })
        },

        () => {
          // Image upload successful
          admin = this.state.admin
          admin.editedItem.image = imagePath
          admin.loading = false
          this.setState({ admin })
        }
      )
    }
  }

  onChangeItemRefImage = evt => {
    let admin = this.state.admin
    admin.editedRefImage = evt.target.files[0]

    // Check and prepare to upload image immediately
    if (admin.editedRefImage !== null && admin.editedRefImage !== undefined) {
      admin.loading = true
    }

    this.setState({ admin })

    // Upload reference image
    if (admin.loading) {
      const storage = Fire.storage()
      let file = admin.editedRefImage
      const imageRef = storage.ref('gallery/' + this.state.item.title + "-ref")
      let task = imageRef.put(file)
      let imagePath = imageRef.fullPath
      task.on('state_changed',
        (snapshot) => {},

        (e) => {
          console.log("Reference image upload error: " + e)
          this.setState({ error: "Something went wrong, please try again later." })
        },

        () => {
          // Image upload successful
          admin = this.state.admin
          admin.editedItem.refImage = imagePath
          admin.loading = false
          this.setState({ admin })
        }
      )
    }
  }

  onChangeItemTitle = evt => {
    let admin = this.state.admin
    admin.editedItem.title = evt.target.value
    this.setState({ admin })
  }

  onChangeItemDesc = evt => {
    let admin = this.state.admin
    admin.editedItem.desc = evt.target.value
    this.setState({ admin })
  }

  onChangeItemPrice = evt => {
    let admin = this.state.admin
    admin.editedItem.price = evt.target.value
    this.setState({ admin })
  }

  onChangeItemWidth = evt => {
    let admin = this.state.admin
    admin.editedItem.width = evt.target.value
    this.setState({ admin })
  }

  onChangeItemHeight = evt => {
    let admin = this.state.admin
    admin.editedItem.height = evt.target.value
    this.setState({ admin })
  }

  onChangeItemThickness = evt => {
    let admin = this.state.admin
    admin.editedItem.thickness = evt.target.value
    this.setState({ admin })
  }

  onChangeItemSold = evt => {
    let admin = this.state.admin
    admin.editedItem.sold = evt.target.checked
    this.setState({ admin })
  }

  onChangeItemIsFeatured = evt => {
    let admin = this.state.admin
    admin.editedItemIsFeatured = evt.target.checked
    this.setState({ admin })
  }

  onChangeItemFeaturedOrder = evt => {
    let admin = this.state.admin
    admin.editedItem.featuredOrder = evt.target.value
    this.setState({ admin })
  }

  onChangeItemTestimonial = evt => {
    let admin = this.state.admin
    admin.editedItem.testimonial = evt.target.value
    this.setState({ admin })
  }

  onChangeItemTestimonialAuthor = evt => {
    let admin = this.state.admin
    admin.editedItem.testimonialAuthor = evt.target.value
    this.setState({ admin })
  }

  onUpdateClicked = () => {
    let item = this.state.admin.editedItem
    let itemId = this.state.itemId

    if (item === null || item === undefined || itemId === null ||
      itemId === undefined || itemId.trim() === ''
    ) { return }

    item.width = Number(item.width)
    item.height = Number(item.height)
    item.thickness = Number(item.thickness)
    item.featuredOrder = Number(item.featuredOrder)

    var firestore = Fire.firestore()
    firestore.collection('gallery').doc(itemId).set(item)
      .then(() => {
        this.setState({ updateSuccessful: true, error: null })
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
                <AdminBanner/>

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
                  <div>
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

                        {
                          (() => {
                            if (this.state.item.price === null ||
                              this.state.item.price === undefined ||
                              this.state.item.price <= 0 ||
                              this.state.item.sold === true
                            ) {
                              // Not for sale
                              return (
                                <p className="details-subtitle">commission</p>
                              )
                            } else {
                              // For sale
                              return (
                                <div>
                                  <a href={'/checkout/' + this.state.itemId}>
                                    <p className="purchase-btn">
                                      <span className="purchase-btn-title">
                                        PURCHASE
                                      </span>
                                      <span className="purchase-btn-price">
                                        ${this.state.item.price}
                                      </span>
                                  </p>
                                  </a>
                                </div>
                              )
                            }
                          })()
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

                    {
                      (() => {
                        if (this.state.item.testimonial !== null &&
                          this.state.item.testimonial !== undefined &&
                          this.state.item.testimonial.trim() !== "" &&
                          this.state.item.testimonialAuthor !== null &&
                          this.state.item.testimonialAuthor !== undefined &&
                          this.state.item.testimonialAuthor.trim() !== ""
                        ) {
                          return (
                            <Columns className="details-testimonial-columns">
                              <Columns.Column></Columns.Column>
                              <Columns.Column size="half" className="details-testimonial">
                                <h1><i>"{this.state.item.testimonial}"</i></h1>
                                <h2>- {this.state.item.testimonialAuthor}</h2>
                              </Columns.Column>
                              <Columns.Column></Columns.Column>
                            </Columns>
                          )
                        } else { return null }
                      })()
                    }

                    {
                      (() => {
                        if (user) {
                          return (
                            <div>
                              { this.state.error != null &&
                                <Columns>
                                  <Columns.Column></Columns.Column>
                                  <Columns.Column size="half">
                                    <Message color="danger" className="admin-error">
                                      <Message.Header>Error</Message.Header>
                                      <Message.Body>
                                        {this.state.error}
                                      </Message.Body>
                                    </Message>
                                  </Columns.Column>
                                  <Columns.Column></Columns.Column>
                                </Columns>
                              }

                              { this.state.error === null && this.state.updateSuccessful === true &&
                                <Columns>
                                  <Columns.Column></Columns.Column>
                                  <Columns.Column size="half">
                                    <Message color="primary" className="admin-successful">
                                      <Message.Header>Successful</Message.Header>
                                      <Message.Body>
                                        Update successful!  Please refresh the page
                                        to see your changes.
                                      </Message.Body>
                                    </Message>
                                  </Columns.Column>
                                  <Columns.Column></Columns.Column>
                                </Columns>
                              }

                              <Box className="admin-box">
                                <h1>Edit</h1>
                                { this.state.admin.loading ? (
                                  <div className="admin-loading">
                                    <h2>uploading, please wait...</h2>
                                  </div>
                                ) : (
                                  <Columns>
                                    <Columns.Column></Columns.Column>
                                    <Columns.Column size="half">
                                      <Field>
                                        <Control>
                                          <div className="file has-name is-info">
                                            <label className="file-label">
                                              <input
                                                className="file-input"
                                                type="file"
                                                onChange={this.onChangeItemImage}
                                                disabled={this.state.admin.disableImageField}
                                                />
                                              <span className="file-cta">
                                                <span className="file-icon">
                                                  <FontAwesomeIcon icon={faUpload}/>
                                                </span>
                                                <span className="file-label">
                                                  Choose main image...
                                                </span>
                                              </span>
                                              <span className="file-name">
                                                {this.state.admin.editedImage != null ?
                                                  <span>{this.state.admin.editedImage.name}</span> :
                                                  <span>none</span>
                                                }
                                              </span>
                                            </label>
                                          </div>
                                        </Control>
                                      </Field>
                                      <Field>
                                        <Control>
                                          <div className="file has-name">
                                            <label className="file-label">
                                              <input
                                                className="file-input"
                                                type="file"
                                                onChange={this.onChangeItemRefImage}
                                                disabled={this.state.admin.disableRefImageField}
                                                />
                                              <span className="file-cta">
                                                <span className="file-icon">
                                                  <FontAwesomeIcon icon={faUpload}/>
                                                </span>
                                                <span className="file-label">
                                                  Choose reference image...
                                                </span>
                                              </span>
                                              <span className="file-name">
                                                {this.state.admin.editedRefImage != null ?
                                                  <span>{this.state.admin.editedRefImage.name}</span> :
                                                  <span>none</span>
                                                }
                                              </span>
                                            </label>
                                          </div>
                                        </Control>
                                      </Field>
                                      <Field>
                                        <Label>Title</Label>
                                        <Control>
                                          <Input
                                            type="text"
                                            placeholder="title"
                                            value={this.state.admin.editedItem.title}
                                            onChange={this.onChangeItemTitle}
                                            />
                                        </Control>
                                      </Field>
                                      <Field>
                                        <Label>Description</Label>
                                        <Control>
                                          <Textarea
                                            className="admin-textarea"
                                            placeholder="description"
                                            value={this.state.admin.editedItem.desc}
                                            onChange={this.onChangeItemDesc}
                                            />
                                        </Control>
                                      </Field>
                                      <Field>
                                        <Control>
                                          <Checkbox
                                            className="b-checkbox styled"
                                            onChange={this.onChangeItemSold}
                                            checked={this.state.admin.editedItem.sold}
                                            >
                                            <span>&nbsp;</span>Is Sold?
                                          </Checkbox>
                                        </Control>
                                      </Field>
                                      <Field>
                                        <Label>Price</Label>
                                        <Control>
                                          <Input
                                            type="number"
                                            placeholder="price"
                                            value={this.state.admin.editedItem.price != null ? this.state.admin.editedItem.price : ""}
                                            onChange={this.onChangeItemPrice}
                                            />
                                        </Control>
                                      </Field>
                                      <Field className="has-addons">
                                        <Control>
                                          <Label>Width</Label>
                                          <Input
                                            type="number"
                                            placeholder="width"
                                            value={this.state.admin.editedItem.width != null ? this.state.admin.editedItem.width : ""}
                                            onChange={this.onChangeItemWidth}
                                            />
                                        </Control>
                                        <Control>
                                          <Label>Height</Label>
                                          <Input
                                            type="number"
                                            placeholder="height"
                                            value={this.state.admin.editedItem.height != null ? this.state.admin.editedItem.height : ""}
                                            onChange={this.onChangeItemHeight}
                                            />
                                        </Control>
                                        <Control>
                                          <Label>Thickness</Label>
                                          <Input
                                            type="number"
                                            placeholder="thickness"
                                            value={this.state.admin.editedItem.thickness != null ? this.state.admin.editedItem.thickness : ""}
                                            onChange={this.onChangeItemThickness}
                                            />
                                        </Control>
                                      </Field>
                                      <Field>
                                        <Control>
                                          <Checkbox
                                            className="b-checkbox styled"
                                            onChange={this.onChangeItemIsFeatured}
                                            checked={this.state.admin.editedItemIsFeatured}
                                            >
                                            <span>&nbsp;</span>Is Featured?
                                          </Checkbox>
                                        </Control>
                                      </Field>

                                      { this.state.admin.editedItemIsFeatured &&
                                        <Field>
                                          <Control>
                                            <Label>Featured Order</Label>
                                            <Input
                                              type="number"
                                              placeholder="featured order"
                                              value={this.state.admin.editedItem.featuredOrder != null ? this.state.admin.editedItem.featuredOrder : ""}
                                              onChange={this.onChangeItemFeaturedOrder}
                                              />
                                          </Control>
                                        </Field>
                                      }

                                      <Field>
                                        <Label>Testimonial</Label>
                                        <Control>
                                          <Textarea
                                            className="admin-textarea"
                                            placeholder="testimonial"
                                            value={this.state.admin.editedItem.testimonial}
                                            onChange={this.onChangeItemTestimonial}
                                            />
                                        </Control>
                                      </Field>
                                      <Field>
                                        <Label>Testimonial Author</Label>
                                        <Control>
                                          <Input
                                            type="text"
                                            placeholder="author"
                                            value={this.state.admin.editedItem.testimonialAuthor}
                                            onChange={this.onChangeItemTestimonialAuthor}
                                            />
                                        </Control>
                                      </Field>
                                      <Button
                                        className="admin-btn is-large"
                                        onClick={this.onUpdateClicked}
                                        >
                                        update
                                      </Button>
                                    </Columns.Column>
                                    <Columns.Column></Columns.Column>
                                  </Columns>
                                )}
                              </Box>
                            </div>
                          )
                        } else { return null }
                      })()
                    }
                  </div>
                }

                {/* Not Found */}
                { this.state.notFound &&
                  <div className="details-notfound">
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
