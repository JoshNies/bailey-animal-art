import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import Button from 'react-bulma-components/lib/components/button'
import {
  Field,
  Control,
  Label,
  Input,
  Textarea
} from 'react-bulma-components/lib/components/form'
import Box from 'react-bulma-components/lib/components/box'
import Level from 'react-bulma-components/lib/components/level'
import Columns from 'react-bulma-components/lib/components/columns'
import Message from 'react-bulma-components/lib/components/message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import { Consumer } from '../MyContext'
import GalleryItem from '../GalleryItem'

// import Painting1 from './Painting_1.jpg'
// import Painting2 from './Painting_2.jpg'
// import Painting3 from './Painting_3.jpg'
// import Painting4 from './Painting_4.jpg'
// import Painting5 from './Painting_5.jpg'
// import Painting6 from './Painting_6.jpg'
// import Painting7 from './Painting_7.png'
// import Painting8 from './Painting_8.jpg'
// import Painting9 from './Painting_9.jpg'
// import Painting10 from './Painting_10.jpg'

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null,
      newSuccessful: false,
      newDialog: false,
      admin: {
        newItem: {
          image: null,
          refImage: null,
          title: "",
          desc: "",
          sold: false,
          price: null,
          width: null,
          height: null,
          thickness: null,
          timestamp: null
        }
      }
    }
  }

  onNewClicked = () => {
    this.setState({ newDialog: true })
  }

  onChangeNewItemTitle = evt => {
    let admin = this.state.admin
    admin.newItem.title = evt.target.value
    this.setState({ admin: admin })
  }

  onChangeNewItemDesc = evt => {
    let admin = this.state.admin
    admin.newItem.desc = evt.target.value
    this.setState({ admin: admin })
  }

  onChangeNewItemPrice = evt => {
    let admin = this.state.admin
    admin.newItem.price = evt.target.value
    this.setState({ admin: admin })
  }

  onChangeNewItemWidth = evt => {
    let admin = this.state.admin
    admin.newItem.width = evt.target.value
    this.setState({ admin: admin })
  }

  onChangeNewItemHeight = evt => {
    let admin = this.state.admin
    admin.newItem.height = evt.target.value
    this.setState({ admin: admin })
  }

  onChangeNewItemThickness = evt => {
    let admin = this.state.admin
    admin.newItem.thickness = evt.target.value
    this.setState({ admin: admin })
  }

  onChangeNewItemImage = evt => {
    let admin = this.state.admin
    admin.newItem.image = evt.target.files[0]
    this.setState({ admin: admin })
  }

  onChangeNewItemRefImage = evt => {
    let admin = this.state.admin
    admin.newItem.refImage = evt.target.files[0]
    this.setState({ admin: admin })
  }

  validateNewDialog() {
    let item = this.state.admin.newItem

    if (item.image == null || item.title == null) {
      return false
    }

    return true
  }

  onAddNewClicked = (evt, storage, db) => {
    if (!this.validateNewDialog()) {
      this.setState({
        error: "There was an empty field.  Please make sure to upload an" +
          " and image and enter a title."
      })
      return
    }

    this.setState({ error: null })

    let file = this.state.admin.newItem.image
    const imageRef = storage.ref('gallery/' + file.name)
    let task = imageRef.put(file)
    let imagePath = imageRef.fullPath
    this.setState({ loading: true })
    task.on('state_changed',
      (snapshot) => {

      },

      (e) => {
        this.setState({ error: e })
      },

      () => {
        // Upload Successful
        let d = new Date()
        let timestamp = d.getTime()

        let item = this.state.admin.newItem
        item.image = imagePath
        item.price == null ? item.price = 0 : item.price = Number(item.price)
        item.timestamp = timestamp

        // Upload date to firestore
        db.collection('gallery').add(this.state.admin.newItem)

        this.setState({ newSuccessful: true, loading: false })
      }
    )
  }

  render () {
    const breakpointColumns = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    return (
      <Consumer>
        { value => {
          const { user, db, storage } = value
          return (
            <div>
              {/* Admin Box */}
              { user &&
                <Box className="admin-box">
                  <Level renderAs="nav">
                    <Level.Item>
                      { this.props.type === "home" ? (
                        <Field className="has-addons">
                          <Control>
                            <Button className="admin-btn">
                              manage featured
                            </Button>
                          </Control>
                          <Control>
                            <Button
                              className="admin-btn"
                              onClick={this.onNewClicked}
                              >
                              <FontAwesomeIcon icon={faPlus}/> new
                            </Button>
                          </Control>
                        </Field>
                      ) : (
                        <Control>
                          <Button className="admin-btn">
                            <FontAwesomeIcon icon={faPlus}/> new
                          </Button>
                        </Control>
                      )}
                    </Level.Item>
                  </Level>
                </Box>
              }

              { this.state.error != null &&
                <Message color="danger" className="admin-error">
                  <Message.Header>Error</Message.Header>
                  <Message.Body>
                    {this.state.error}
                  </Message.Body>
                </Message>
              }

              { this.state.error === null && this.state.newSuccessful === true &&
                <Message color="primary" className="admin-successful">
                  <Message.Header>Successful</Message.Header>
                  <Message.Body>
                    "Upload successful!"
                  </Message.Body>
                </Message>
              }

              {/* "Add New" dialog */}
              { this.state.newDialog &&
                <Box className="admin-box-creation">
                  <h1>Add New</h1>
                  {this.state.loading ? (
                    <div className="admin-loading">
                      <h2>uploading, please wait...</h2>
                    </div>
                  ) : (
                    <Columns>
                      <Columns.Column></Columns.Column>
                      <Columns.Column>
                        <Field>
                          <Control>
                            <div className="file has-name is-info">
                              <label className="file-label">
                                <input
                                  className="file-input"
                                  type="file"
                                  onChange={this.onChangeNewItemImage}
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
                                  {this.state.admin.newItem.image != null ?
                                    <span>{this.state.admin.newItem.image.name}</span> :
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
                                  onChange={this.onChangeNewItemRefImage}
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
                                  {this.state.admin.newItem.refImage != null ?
                                    <span>{this.state.admin.newItem.refImage.name}</span> :
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
                              value={this.state.admin.newItem.title}
                              onChange={this.onChangeNewItemTitle}
                              />
                          </Control>
                        </Field>
                        <Field>
                          <Label>Description</Label>
                          <Control>
                            <Textarea
                              className="admin-textarea"
                              placeholder="description"
                              value={this.state.admin.newItem.desc}
                              onChange={this.onChangeNewItemDesc}
                              />
                          </Control>
                        </Field>
                        <Field>
                          <Label>Price</Label>
                          <Control>
                            <Input
                              type="number"
                              placeholder="price"
                              value={this.state.admin.newItem.price != null ? this.state.admin.newItem.price : ""}
                              onChange={this.onChangeNewItemPrice}
                              />
                          </Control>
                        </Field>

                        { this.state.admin.newItem.price > 0 ? (
                          <Field className="has-addons">
                            <Control>
                              <Label>Width</Label>
                              <Input
                                type="number"
                                placeholder="width"
                                value={this.state.admin.newItem.width != null ? this.state.admin.newItem.width : ""}
                                onChange={this.onChangeNewItemWidth}
                                />
                            </Control>
                            <Control>
                              <Label>Height</Label>
                              <Input
                                type="number"
                                placeholder="height"
                                value={this.state.admin.newItem.height != null ? this.state.admin.newItem.height : ""}
                                onChange={this.onChangeNewItemHeight}
                                />
                            </Control>
                            <Control>
                              <Label>Thickness</Label>
                              <Input
                                type="number"
                                placeholder="thickness"
                                value={this.state.admin.newItem.thickness != null ? this.state.admin.newItem.thickness : ""}
                                onChange={this.onChangeNewItemThickness}
                                />
                            </Control>
                          </Field>
                        ) : (
                          <Field className="has-addons">
                            <Control>
                              <Label>Width</Label>
                              <Input
                                type="number"
                                placeholder="width"
                                value={this.state.admin.newItem.width != null ? this.state.admin.newItem.width : ""}
                                onChange={this.onChangeNewItemWidth}
                                />
                            </Control>
                            <Control>
                              <Label>Height</Label>
                              <Input
                                type="number"
                                placeholder="height"
                                value={this.state.admin.newItem.height != null ? this.state.admin.newItem.height : ""}
                                onChange={this.onChangeNewItemHeight}
                                />
                            </Control>
                          </Field>
                        )}

                        <Button
                          className="admin-btn is-large"
                          onClick={event => this.onAddNewClicked(event, storage, db)}
                          >
                          add
                        </Button>
                      </Columns.Column>
                      <Columns.Column></Columns.Column>
                    </Columns>
                  )}
                </Box>
              }
              <Masonry
                breakpointCols={breakpointColumns}
                className="gallery-masonry-grid"
                columnClassName="gallery-masonry-grid-column"
                >
                {/* <GalleryItem image={Painting1}/>
                <GalleryItem image={Painting2}/>
                <GalleryItem image={Painting3}/>
                <GalleryItem image={Painting4}/>
                <GalleryItem image={Painting5}/>
                <GalleryItem image={Painting6}/>
                <GalleryItem image={Painting7}/>
                <GalleryItem image={Painting8}/>
                <GalleryItem image={Painting9}/>
                <GalleryItem image={Painting10}/> */}
                {this.props.children}
              </Masonry>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Gallery
