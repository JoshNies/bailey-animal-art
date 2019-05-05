import React, { Component } from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
import Button from 'react-bulma-components/lib/components/button'
import { Consumer } from '../../MyContext'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import Fire from '../../../config/Firebase'

class GalleryItemDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: this.props.match.params.itemId,
      item: null,
      notFound: false
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
          this.setState({ notFound: true })
          return
        }

        this.setState({ item: doc.data() })
      })
      .catch(e => {
        console.log("Gallery item fetching error: " + e)
      })
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

                {/* Item Details */}
                { this.state.item !== null && this.state.item !== undefined &&
                  <Columns>
                    <Columns.Column></Columns.Column>
                    <Columns.Column className="details-image">
                      <h1>IMAGE HERE</h1>
                    </Columns.Column>
                    <Columns.Column className="details-block">
                      <h1>{this.state.item.title}</h1>
                      <p>{this.state.item.desc}</p>
                    </Columns.Column>
                    <Columns.Column></Columns.Column>
                  </Columns>
                }

                {/* Not Found */}
                { this.state.notFound &&
                  <div>
                    <h1>Not Found</h1>
                  </div>
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
