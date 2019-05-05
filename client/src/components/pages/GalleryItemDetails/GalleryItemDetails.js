import React, { Component } from 'react'
import { Consumer } from '../../MyContext'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import Fire from '../../../config/Firebase'

class GalleryItemDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: this.props.match.params.itemId,
      item: null
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
        // Redirect to Not Found page if doc doesn't exist
        if (!doc.exists) {
          this.redirectToNotFound()
          return
        }

        this.setState({ item: doc.data() })
      })
      .catch(e => {
        console.log("Gallery item fetching error: " + e)
      })
  }

  redirectToNotFound = () => {
    this.props.history.push('/404')
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
                <h1>Gallery Item Details</h1>
                <h2>Details for item: {this.state.itemId}</h2>

                {/* DEBUG */}
                { this.state.item !== null && this.state.item !== undefined &&
                  <p>Item fetched! Has title: {this.state.item.title}</p>
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
