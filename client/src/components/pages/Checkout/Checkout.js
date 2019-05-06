import React, { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Button from 'react-bulma-components/lib/components/button'
import Columns from 'react-bulma-components/lib/components/columns'
import request from 'superagent'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import Fire from '../../../config/Firebase'
import CheckoutForm from '../../CheckoutForm'

class Checkout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: this.props.match.params.itemId,
      item: null,
      payed: false
    }
  }

  componentDidMount() {
    // Fetch item details
    this.fetchItem()
  }

  fetchItem = () => {
    var firestore = Fire.firestore()
    firestore.collection('gallery').doc(this.state.itemId).get()
      .then(doc => {
        if (!doc.exists) {
          console.log("Tried to fetch non-existant item.")
          return
        }

        this.setState({ item: doc.data() })
      })
      .catch(e => {
        console.log("Item fetching error: " + e)
      })
  }

  onPaySuccess = (formState) => {
    // Update item as sold
    var firestore = Fire.firestore()

    let item = this.state.item
    item.sold = true

    firestore.collection('gallery').doc(this.state.itemId).set(item)
      .then(() => {
        this.setState({ payed: true })
      })
      .catch(e => {
        console.log("Item sold update error: " + e)

        // Set payed state for showing success message
        this.setState({ payed: true })
      })

    // Send email to admin about new purchase
    this.sendEmail(formState)
  }

  sendEmail(formState) {
    // Send email
    request
      .post('/api/sendemail')
      .set('Accept', 'application/json')
      .query({ subject: 'Bailey Animal Art - New Purchase' })
      .query({
        text: 'Someone bought one of your paintings!  Order Details: Item Name: ' +
          this.state.item.title + '; Customer Name: ' + formState.name +
          '; Email: ' + formState.email + '; Address: ' + formState.address +
          '; City: ' + formState.city + '; State: ' + formState.state +
          '; Zipcode: ' + formState.zip + '; Total Payment: $' +
          this.state.item.price + ' + $30 for shipping.'
      })
      .query({
        html: '<h3>Someone bought one of your paintings!</h3><br/><h4>Order Details:</h4>' +
        '<br/><p><b>Item Name:</b> ' + this.state.item.title +
        '<br/><p><b>Custom Name:</b> ' + formState.name +
        '<br/><p><b>Email:</b> ' + formState.email +
        '<br/><p><b>Address:</b> ' + formState.address +
        '<br/><p><b>City:</b> ' + formState.city +
        '<br/><p><b>State:</b> ' + formState.state +
        '<br/><p><b>Zipcode:</b> ' + formState.zip +
        '<br/><p><b>Total Payment:</b> $' + this.state.item.price + ' + $30 for shipping.'
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
      <div className="baa-container">
        <div className="baa-content checkout-container">
          <BAANavbar/>
          <Columns>
            <Columns.Column></Columns.Column>

            {
              (() => {
                if (this.state.payed) {
                  // Show payment successful message
                  return (
                    <Columns.Column size="half" className="checkout-payed-container">
                      <h1>purchase successful!</h1>
                      <h2>
                        thank you so much!  your item is currently being processed and will ship to
                        your address as soon as its ready.
                      </h2>
                      <a href="/">
                        <Button
                          className="checkout-redirect-btn"
                          >
                          go back to home
                        </Button>
                      </a>
                    </Columns.Column>
                  )
                }
              })()
            }

            { !this.state.payed &&
              <Columns.Column size="one-third" className="checkout-details">
                { this.state.item !== null &&
                  this.state.item !== undefined &&
                  <div>
                    <h1>{this.state.item.title}</h1>
                    <h2>item price: &nbsp;&nbsp;&nbsp;${this.state.item.price}</h2>
                    <h2>+ shipping: &nbsp;&nbsp;&nbsp;$30</h2>
                    <hr />
                    <h2>total: &nbsp;&nbsp;&nbsp;${this.state.item.price + 30}</h2>
                    <h3>U.S. only. &nbsp;all sales are final.</h3>
                  </div>
                }
              </Columns.Column>
            }

            { !this.state.payed &&
              <Columns.Column size="one-third">
                { this.state.item !== null &&
                  this.state.item !== undefined &&
                  <StripeProvider apiKey="pk_test_ua5aCVZGse7OP76qKt6bRKTq007WyAnzpJ">
                    <Elements>
                      <CheckoutForm
                        price={this.state.item.price}
                        onSuccess={(formState) => this.onPaySuccess(formState)}
                        />
                    </Elements>
                  </StripeProvider>
                }
              </Columns.Column>
            }
            <Columns.Column></Columns.Column>
          </Columns>
        </div>
        <BAAFooter/>
      </div>
    )
  }
}

export default Checkout;
