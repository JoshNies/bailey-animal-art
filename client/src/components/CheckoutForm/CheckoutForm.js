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
      city: "",
      state: "",
      zip: ""
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

  onChangeCity = evt => {
    this.setState({ city: evt.target.value })
  }

  onChangeState = evt => {
    this.setState({ state: evt.target.value })
  }

  onChangeZip = evt => {
    this.setState({ zip: evt.target.value })
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
      this.state.city === null ||
      this.state.city === undefined ||
      this.state.city === '' ||
      this.state.state === null ||
      this.state.state === undefined ||
      this.state.state === '' ||
      this.state.state.length < 2 ||
      this.state.zip === null ||
      this.state.zip === undefined ||
      this.state.zip === '' ||
      this.state.zip.length < 5
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

    this.setState({ error: null })

    // Stripe payment
    try {
      let token = await this.props.stripe.createToken({ name: this.state.name })
      console.log("Stripe Token: " + token)
    } catch (e) {
      console.log("Payment error: " + e)
      this.setState({
        error: "Something went wrong.  Please make sure all fields are typed in correctly."
      })
    }
  }

  render () {
    return (
      <div className="checkout-form-container">
        { this.state.error != null &&
          <Message color="danger" className="checkout-error">
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
            <Label>City</Label>
            <Input
              type="text"
              placeholder="city"
              value={this.state.city}
              onChange={this.onChangeCity}
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
        <Field>
          <Control>
            <Label>Zipcode</Label>
            <Input
              type="number"
              placeholder="zipcode"
              value={this.state.zip}
              onChange={this.onChangeZip}
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
