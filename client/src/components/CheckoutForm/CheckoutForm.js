import React, { Component } from 'react'
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'
import {
  Field,
  Control,
  Label,
  Input
} from 'react-bulma-components/lib/components/form'
import Box from 'react-bulma-components/lib/components/box'
import Message from 'react-bulma-components/lib/components/message'
import Columns from 'react-bulma-components/lib/components/columns'
import Button from 'react-bulma-components/lib/components/button'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ""
    }
  }

  onChangeName = evt => {
    this.setState({ name: evt.target.value })
  }

  render () {
    return (
      <div className="checkout-form-container">
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
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
