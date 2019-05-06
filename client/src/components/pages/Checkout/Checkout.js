import React, { Component } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import Columns from 'react-bulma-components/lib/components/columns'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import Fire from '../../../config/Firebase'
import CheckoutForm from '../../CheckoutForm'

class Checkout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: this.props.match.params.itemId,
      item: null
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

  render () {
    return (
      <div className="baa-container">
        <div className="baa-content checkout-container">
          <BAANavbar/>
          <Columns>
            <Columns.Column></Columns.Column>
            <Columns.Column size="one-third" className="checkout-details">
              { this.state.item !== null &&
                this.state.item !== undefined &&
                <div>
                  <h1>{this.state.item.title}</h1>
                  <h2>item price: &nbsp;&nbsp;&nbsp;${this.state.item.price}</h2>
                  <h2>+ shipping: &nbsp;&nbsp;&nbsp;$30</h2>
                  <hr />
                  <h2>total: &nbsp;&nbsp;&nbsp;${this.state.item.price + 30}</h2>
                  <h3>all sales are final.</h3>
                </div>
              }
            </Columns.Column>
            <Columns.Column size="one-third">
              <StripeProvider apiKey="pk_test_ua5aCVZGse7OP76qKt6bRKTq007WyAnzpJ">
                <Elements>
                  <CheckoutForm/>
                </Elements>
              </StripeProvider>
            </Columns.Column>
            <Columns.Column></Columns.Column>
          </Columns>
        </div>
        <BAAFooter/>
      </div>
    )
  }
}

export default Checkout;
