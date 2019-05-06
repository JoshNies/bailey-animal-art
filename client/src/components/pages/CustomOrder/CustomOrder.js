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
import Dropdown from 'react-bulma-components/lib/components/dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { BarLoader } from 'react-spinners'
import request from 'superagent'
import { Consumer } from '../../MyContext'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import AdminBanner from '../../AdminBanner'
import Fire from '../../../config/Firebase'

class CustomOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null,
      successful: false,
      email: "",
      type: "portrait",
      numPets: "1",
      desc: "",
      width: "",
      height: "",
      thickness: "",
      refImage: null
    }
  }

  onChangeEmail = evt => {
    this.setState({ email: evt.target.value })
  }

  onChangeType = selected => {
    this.setState({ type: selected })
  }

  onChangeNumPets = selected => {
    this.setState({ numPets: selected })
  }

  onChangeRefImage = evt => {
    this.setState({ refImage: evt.target.files[0] })
  }

  onChangeDesc = evt => {
    this.setState({ desc: evt.target.value })
  }

  onChangeWidth = evt => {
    this.setState({ width: evt.target.value })
  }

  onChangeHeight = evt => {
    this.setState({ height: evt.target.value })
  }

  onChangeThickness = evt => {
    this.setState({ thickness: evt.target.value })
  }

  validateForm = () => {
    if (this.state.email === null ||
      this.state.email === undefined ||
      this.state.email.trim() === '' ||
      this.state.type === null ||
      this.state.type === undefined ||
      this.state.type.trim() === '' ||
      this.state.numPets === null ||
      this.state.numPets === undefined ||
      this.state.numPets.trim() === '' ||
      isNaN(Number(this.state.numPets)) ||
      this.state.desc === null ||
      this.state.desc === undefined ||
      this.state.desc.trim() === '' ||
      this.state.width === null ||
      this.state.width === undefined ||
      this.state.width.trim() === '' ||
      isNaN(Number(this.state.width)) ||
      this.state.height === null ||
      this.state.height === undefined ||
      this.state.height.trim() === '' ||
      isNaN(Number(this.state.height)) ||
      this.state.thickness === null ||
      this.state.thickness === undefined ||
      this.state.thickness.trim() === '' ||
      isNaN(Number(this.state.thickness)) ||
      this.state.refImage === null ||
      this.state.refImage === undefined
    ) {
      return false
    }

    return true
  }

  onSubmitClicked = (evt, storage) => {
    if (!this.validateForm()) {
      this.setState({
        error: "A field was left empty or is incorrect.  Please fill out all fields."
      })
      return
    }

    // Upload reference image
    let file = this.state.refImage
    const imageRef = storage.ref('custom-orders/' + this.state.refImage.name)
    let task = imageRef.put(file)
    let imagePath = imageRef.fullPath
    this.setState({ loading: true, error: null })
    task.on('state_changed',
      (snapshot) => {},

      (e) => {
        console.log("Reference image upload error: " + e)
        this.setState({
          error: "Something went wrong, please try again later.",
          loading: false
        })
      },

      () => {
        // Main image upload successful
        imageRef.getDownloadURL()
          .then(url => {
            this.sendEmail(url)
          })
          .catch(e => {
            console.log("Reference image download url error: " + e)
            this.setState({
              error: "Something went wrong, please try again later.",
              loading: false
            })
          })
      }
    )
  }

  sendEmail(refImageUrl) {
    // Send email
    request
      .post('/api/custom-order/send')
      .set('Accept', 'application/json')
      .query({
        text: 'New custom order request from ' + this.state.email + '.  ' +
          'Description: ' + this.state.desc + ';  Dimensions: ' +
          this.state.width + ' x ' + this.state.height + ' in, thickness of ' +
          this.state.thickness + ' in.  Type: ' + this.state.type +
          ';  Number of pets: ' + this.state.numPets + ';  Reference image link: ' +
          refImageUrl
      })
      .query({
        html: '<h3>New custom order request from ' + this.state.email + '.</h3>' +
        '<hr /><p><b>Description:</b> ' + this.state.desc + '</p><hr /><p><b>Dimensions:</b> ' +
        this.state.width + ' x ' + this.state.height + ' in, thickness of ' +
        this.state.thickness + ' in</p><hr /><p><b>Type:</b> ' + this.state.type +
        '</p><hr /><p><b>Number of pets:</b> ' + this.state.numPets + '</p><hr /><p>' +
        '<b>Reference image link:</b> ' + refImageUrl
      })
      .send({
        "message": "The message"
      })
      .end((err, res) => {
        if (err) {
          console.log('Error: ', err)
          this.setState({
            error: "Something went wrong, please try again later.",
            loading: false
          })
        } else {
          // Email send successfully
          this.setState({ loading: false, successful: true, error: null })
        }
      })
  }

  render () {
    return (
      <Consumer>
        { value => {
          const { user, storage } = value
          return (
            <div className="baa-container">
              <div className="baa-content">
                <BAANavbar/>

                { this.state.loading &&
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

                <div className="heading">
                  <h1>Custom Order</h1>
                  <h2>Get a quote from Teresa Bailey</h2>
                  <p>
                    Please note that a 25% non-refundable deposit is required
                    before work starts on the artwork.  All sales are final.
                  </p>
                </div>

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

                { this.state.error === null && this.state.successful === true &&
                  <Columns>
                    <Columns.Column></Columns.Column>
                    <Columns.Column size="half">
                      <Message color="primary" className="admin-successful">
                        <Message.Header>Successful</Message.Header>
                        <Message.Body>
                          Custom order sent!  Please wait for Teresa Bailey's
                          reply.
                        </Message.Body>
                      </Message>
                    </Columns.Column>
                    <Columns.Column></Columns.Column>
                  </Columns>
                }

                {
                  (() => {
                    if (this.state.loading) {
                      return (
                        <div className="co-loading-block">
                          <h1>please wait while we send your request...</h1>
                        </div>
                      )
                    } else {
                      return (
                        <Columns className="co-columns">
                          <Columns.Column></Columns.Column>
                          <Columns.Column size="half" className="co-form">
                            <Field>
                              <Label>Email</Label>
                              <Control>
                                <Input
                                  type="email"
                                  placeholder="email"
                                  value={this.state.email}
                                  onChange={this.onChangeEmail}
                                  />
                              </Control>
                            </Field>
                            <Field>
                              <Label>Type</Label>
                              <Control>
                                <Dropdown
                                  className="co-dropdown"
                                  value={this.state.type}
                                  onChange={this.onChangeType}
                                  >
                                  <Dropdown.Item value="portrait">
                                    Portrait
                                  </Dropdown.Item>
                                  <Dropdown.Item value="landscape/scene">
                                    Landscape/Scene
                                  </Dropdown.Item>
                                </Dropdown>
                              </Control>
                            </Field>
                            <Field>
                              <Label>Number of pets</Label>
                              <Control>
                                <Dropdown
                                  className="co-dropdown"
                                  value={this.state.numPets}
                                  onChange={this.onChangeNumPets}
                                  >
                                  <Dropdown.Item value="1">1</Dropdown.Item>
                                  <Dropdown.Item value="2">2</Dropdown.Item>
                                </Dropdown>
                              </Control>
                            </Field>
                            <Field>
                              <Label>Description and other notes</Label>
                              <Control>
                                <Textarea
                                  className="co-textarea"
                                  placeholder="description/notes"
                                  value={this.state.desc}
                                  onChange={this.onChangeDesc}
                                  />
                              </Control>
                            </Field>
                            <Field className="has-addons">
                              <Control>
                                <Label>Width (in)</Label>
                                <Input
                                  type="number"
                                  placeholder="width (in)"
                                  value={this.state.width != null ? this.state.width : ""}
                                  onChange={this.onChangeWidth}
                                  />
                              </Control>
                              <Control>
                                <Label>Height (in)</Label>
                                <Input
                                  type="number"
                                  placeholder="height (in)"
                                  value={this.state.height != null ? this.state.height : ""}
                                  onChange={this.onChangeHeight}
                                  />
                              </Control>
                              <Control>
                                <Label>Thickness (in)</Label>
                                <Input
                                  type="number"
                                  placeholder="thickness (in)"
                                  value={this.state.thickness != null ? this.state.thickness : ""}
                                  onChange={this.onChangeThickness}
                                  />
                              </Control>
                            </Field>
                            <Field>
                              <Control>
                                <div className="file has-name is-info">
                                  <label className="file-label">
                                    <input
                                      className="file-input"
                                      type="file"
                                      accept=".jpg,.jpeg,.png,.gif,.bmp"
                                      onChange={this.onChangeRefImage}
                                      disabled={this.state.refImage}
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
                                      {this.state.refImage != null ?
                                        <span>{this.state.refImage.name}</span> :
                                        <span>none</span>
                                      }
                                    </span>
                                  </label>
                                </div>
                              </Control>
                            </Field>
                            <Field>
                              <Control>
                                <Button
                                  className="co-btn is-large"
                                  onClick={event => this.onSubmitClicked(event, storage)}
                                  >
                                  submit
                                </Button>
                              </Control>
                            </Field>
                          </Columns.Column>
                          <Columns.Column></Columns.Column>
                        </Columns>
                      )
                    }
                  })()
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

export default CustomOrder
