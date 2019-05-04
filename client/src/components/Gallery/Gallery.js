import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import Button from 'react-bulma-components/lib/components/button'
import {
  Field,
  Control,
  Label,
  Input,
  Checkbox,
  Textarea,
  InputFile
} from 'react-bulma-components/lib/components/form'
import Box from 'react-bulma-components/lib/components/box'
import Level from 'react-bulma-components/lib/components/level'
import Columns from 'react-bulma-components/lib/components/columns'
import Icon from 'react-bulma-components/lib/components/icon'
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
          thickness: null
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
          const { user } = value
          return (
            <div>
              {/* Admin Box */}
              { user &&
                <Box className="admin-box">
                  <Level renderAs="nav">
                    <Level.Item>
                      { this.props.type == "home" ? (
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

              {/* "Add New" dialog */}
              { this.state.newDialog &&
                <Box className="admin-box-creation">
                  <h1>Add New</h1>
                  <Columns>
                    <Columns.Column></Columns.Column>
                    <Columns.Column>
                      <Field>
                        <Control>
                          <div class="file has-name is-info">
                            <label class="file-label">
                              <input
                                class="file-input"
                                type="file"
                                onChange={this.onChangeNewItemImage}
                                />
                              <span class="file-cta">
                                <span class="file-icon">
                                  <FontAwesomeIcon icon={faUpload}/>
                                </span>
                                <span class="file-label">
                                  Choose main image...
                                </span>
                              </span>
                              <span class="file-name">
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
                          <div class="file has-name">
                            <label class="file-label">
                              <input
                                class="file-input"
                                type="file"
                                onChange={this.onChangeNewItemRefImage}
                                />
                              <span class="file-cta">
                                <span class="file-icon">
                                  <FontAwesomeIcon icon={faUpload}/>
                                </span>
                                <span class="file-label">
                                  Choose reference image...
                                </span>
                              </span>
                              <span class="file-name">
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
                            value={this.state.admin.newItem.price}
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
                              value={this.state.admin.newItem.width}
                              onChange={this.onChangeNewItemWidth}
                              />
                          </Control>
                          <Control>
                            <Label>Height</Label>
                            <Input
                              type="number"
                              placeholder="height"
                              value={this.state.admin.newItem.height}
                              onChange={this.onChangeNewItemHeight}
                              />
                          </Control>
                          <Control>
                            <Label>Thickness</Label>
                            <Input
                              type="number"
                              placeholder="thickness"
                              value={this.state.admin.newItem.thickness}
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
                              value={this.state.admin.newItem.width}
                              onChange={this.onChangeNewItemWidth}
                              />
                          </Control>
                          <Control>
                            <Label>Height</Label>
                            <Input
                              type="number"
                              placeholder="height"
                              value={this.state.admin.newItem.height}
                              onChange={this.onChangeNewItemHeight}
                              />
                          </Control>
                        </Field>
                      )}

                      <Button
                        className="admin-btn is-large"
                        onClick={this.onLogInClicked}
                        >
                        add
                      </Button>
                    </Columns.Column>
                    <Columns.Column></Columns.Column>
                  </Columns>
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
