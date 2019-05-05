import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import Button from 'react-bulma-components/lib/components/button'
import {
  Field,
  Control,
  Label,
  Input,
  Textarea,
  Checkbox
} from 'react-bulma-components/lib/components/form'
import Box from 'react-bulma-components/lib/components/box'
import Level from 'react-bulma-components/lib/components/level'
import Columns from 'react-bulma-components/lib/components/columns'
import Message from 'react-bulma-components/lib/components/message'
import Loader from 'react-bulma-components/lib/components/loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Consumer } from '../MyContext'
import GalleryItem from '../GalleryItem'
import Fire from '../../config/Firebase'

const itemFetchLimit = 4

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      enableEmptyText: false,
      loading: false,
      error: null,
      newSuccessful: false,
      newDialog: false,
      newItemIsFeatured: false,
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
          featuredOrder: null,
          timestamp: null
        }
      },
      fetchIndex: 0,
      nextQuery: null,
      hasMore: true
    }
  }

  componentDidMount() {
    // Fetch gallery items
    this.fetchItems()
  }

  fetchItems = () => {
    if (this.state.nextQuery !== null && this.state.nextQuery !== undefined) {
      // Subsequent query
      var query = this.state.nextQuery
      query.get()
        .then(snapshot => {
          // Save each item's data from snapshot into array
          let items = this.state.items
          let hasMore = false
          snapshot.forEach(item => {
            items.push(item.data())
            console.log("New item: " + item.id)
            hasMore = true
          })

          // Return if no more, and save hasMore state for infinite scroll
          // component
          if (!hasMore) {
            console.log("No more!")
            this.setState({ enableEmptyText: true, hasMore: false })
            return
          }

          // Calculate next query
          var last = snapshot.docs[snapshot.docs.length - 1]
          var next = query.startAfter(last.data().timestamp)

          this.setState({
            items,
            enableEmptyText: true,
            fetchIndex: this.state.fetchIndex + (itemFetchLimit - 1),
            nextQuery: next
          })
        })
        .catch(e => {
          this.setState({ enableEmptyText: true })
          console.log("Gallery fetching error: " + e)
        })
    } else {
      // First query
      var firestore = Fire.firestore()
      query = firestore.collection('gallery')
        .orderBy('timestamp')
        .limit(itemFetchLimit)

      query.get()
        .then(snapshot => {
          // Save each item's data from snapshot into array
          let items = this.state.items
          snapshot.forEach(item => {
            items.push(item.data())
          })

          // Calculate next query
          var last = snapshot.docs[snapshot.docs.length - 1]
          var next = query.startAfter(last.data().timestamp)

          this.setState({
            items,
            enableEmptyText: true,
            fetchIndex: this.state.fetchIndex + (itemFetchLimit - 1),
            nextQuery: next
          })
        })
        .catch(e => {
          this.setState({ enableEmptyText: true })
          console.log("Gallery fetching error: " + e)
        })
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

  onChangeNewItemIsFeatured = evt => {
    this.setState({ newItemIsFeatured: evt.target.checked })
  }

  onChangeNewItemFeaturedOrder = evt => {
    let admin = this.state.admin
    admin.newItem.featuredOrder = evt.target.value
    this.setState({ admin: admin })
  }

  validateNewDialog() {
    let item = this.state.admin.newItem

    if (item.image === null || item.title === null || item.title.trim() === "") {
      return false
    }

    return true
  }

  onAddNewClicked = (evt, storage, db) => {
    if (!this.validateNewDialog()) {
      this.setState({
        error: "There was an empty field.  Please make sure to upload the" +
          " main image and enter a title."
      })
      return
    }

    this.setState({ error: null })

    // Upload main image
    let file = this.state.admin.newItem.image
    const imageRef = storage.ref('gallery/' + file.name + "-main")
    let task = imageRef.put(file)
    let imagePath = imageRef.fullPath
    this.setState({ loading: true })
    task.on('state_changed',
      (snapshot) => {},

      (e) => {
        this.setState({ error: e })
      },

      () => {
        // Main image upload successful
        // Upload reference image if needed
        let refFile = this.state.admin.newItem.refImage
        if (refFile === null || refFile === undefined) {
          this.saveNewItemToDb(db, imagePath, null)
          return
        }

        const refImageRef = storage.ref('gallery/' + refFile.name + "-ref")
        let refTask = refImageRef.put(file)
        let refImagePath = refImageRef.fullPath
        refTask.on('state_changed',
          (snapshot) => {},

          (e) => {
            this.setState({ error: e })
          },

          () => {
            // Reference image upload successful
            this.saveNewItemToDb(db, imagePath, refImagePath)
          }
        )
      }
    )
  }

  saveNewItemToDb(db, imagePath, refImagePath) {
    let d = new Date()
    let timestamp = d.getTime()

    let item = this.state.admin.newItem
    item.image = imagePath
    item.refImage = refImagePath
    item.price === null ? item.price = 0 : item.price = Number(item.price)
    item.width === null ? item.width = 0 : item.width = Number(item.width)
    item.height === null ? item.height = 0 : item.height = Number(item.height)
    item.thickness === null ? item.thickness = 0 : item.thickness = Number(item.thickness)

    if (item.featuredOrder !== null &&
      item.featuredOrder !== undefined &&
      item.featuredOrder !== ""
    ) {
      item.featuredOrder = Number(item.featuredOrder)
    }

    item.timestamp = timestamp

    // Upload date to firestore
    db.collection('gallery').add(this.state.admin.newItem)

    // Clear new item state
    let admin = this.state.admin
    let defaultItem = {
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
    admin.newItem = defaultItem

    this.setState({
      newSuccessful: true,
      loading: false,
      admin
    })
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

              { this.state.error === null && this.state.newSuccessful === true &&
                <Columns>
                  <Columns.Column></Columns.Column>
                  <Columns.Column size="half">
                    <Message color="primary" className="admin-successful">
                      <Message.Header>Successful</Message.Header>
                      <Message.Body>
                        Upload successful!
                      </Message.Body>
                    </Message>
                  </Columns.Column>
                  <Columns.Column></Columns.Column>
                </Columns>
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

                        <Field>
                          <Control>
                            <Checkbox
                              className="b-checkbox styled"
                              onChange={this.onChangeNewItemIsFeatured}
                              checked={this.state.newItemIsFeatured}
                              >
                              <span>&nbsp;</span>Is Featured?
                            </Checkbox>
                          </Control>
                        </Field>

                        { this.state.newItemIsFeatured &&
                          <Field>
                            <Control>
                              <Label>Featured Order</Label>
                              <Input
                                type="number"
                                placeholder="featured order"
                                value={this.state.admin.newItem.featuredOrder != null ? this.state.admin.newItem.featuredOrder : ""}
                                onChange={this.onChangeNewItemFeaturedOrder}
                                />
                            </Control>
                          </Field>
                        }

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
              <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchItems}
                hasMore={this.state.hasMore}
                loader={
                  <div className="pagination-loading">
                    <Loader />
                  </div>
                }
                >
                <Masonry
                  id="masonry"
                  breakpointCols={breakpointColumns}
                  className="gallery-masonry-grid"
                  columnClassName="gallery-masonry-grid-column"
                  >
                {
                  this.state.items.map((item, index) => {
                    return (
                      <GalleryItem
                        key={index}
                        imagePath={item.image}
                        />
                    )
                  })
                }
                </Masonry>
              </InfiniteScroll>
              { (this.state.items === null || this.state.items.length === undefined ||
                this.state.items.length === 0) && this.state.enableEmptyText &&
                <p className="gallery-empty-text">nothing here, please check back later.</p>
              }
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Gallery
