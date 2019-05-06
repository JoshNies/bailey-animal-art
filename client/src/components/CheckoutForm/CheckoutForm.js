import React, { Component } from 'react'
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'
import {
  Field,
  Control,
  Label,
  Input
} from 'react-bulma-components/lib/components/form'
import Message from 'react-bulma-components/lib/components/message'
import Columns from 'react-bulma-components/lib/components/columns'
import Button from 'react-bulma-components/lib/components/button'
import request from 'superagent'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      address: "",
      state: ""
    }
  }

  alphaOnly = (evt) => {
    var key = evt.keyCode
    return ((key >= 65 && key <= 90) || key == 8)
  };

  onChangeName = evt => {
    this.setState({ name: evt.target.value })
  }

  onChangeEmail = evt => {
    this.setState({ email: evt.target.value })
  }

  onChangeAddress = evt => {
    this.setState({ address: evt.target.value })
  }

  onChangeState = evt => {
    this.setState({ state: evt.target.value })
  }

  validateInputs = () => {
    if (this.state.name === null ||
      this.state.name === undefined ||
      this.state.name === '' ||
      this.state.email === null ||
      this.state.email === undefined ||
      this.state.email === '' ||
      this.state.address === null ||
      this.state.address === undefined ||
      this.state.address === '' ||
      this.state.state === null ||
      this.state.state === undefined ||
      this.state.state === ''
    ) {
      return false
    }

    return true
  }

  onPayClicked = async () => {
    if (!this.validateInputs()) {
      this.setState({ error: "A field was left empty.  Please fill in all fields." })
      return
    }

    let token = this.props.stripe.createToken({ name: this.state.name })
  }

  render () {
    return (
      <div className="checkout-form-container">
        { this.state.error != null &&
          <Message color="danger" className="admin-error">
            <Message.Header>Error</Message.Header>
            <Message.Body>
              {this.state.error}
            </Message.Body>
          </Message>
        }

        <Field>
          <Control>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="name"
              value={this.state.name}
              onChange={this.onChangeName}
              />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
          </Control>
        </Field>
        <Label>Billing Info</Label>
        <CardElement
          className="checkout-card"
          />
        <Field>
          <Control>
            <Label>Address</Label>
            <Input
              type="text"
              placeholder="address"
              value={this.state.address}
              onChange={this.onChangeAddress}
              />
          </Control>
        </Field>
        <Field>
          <Control>
            <Label>State (2-character code)</Label>
            <Input
              className="checkout-input-state"
              type="text"
              placeholder="state"
              value={this.state.state}
              onChange={this.onChangeState}
              maxLength="2"
              pattern="[a-zA-Z]*"
              />
          </Control>
        </Field>
        <Button
          className="checkout-btn"
          onClick={this.onPayClicked}
          >
          PAY
        </Button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
