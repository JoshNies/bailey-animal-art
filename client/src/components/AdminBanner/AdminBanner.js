import React, { Component } from 'react'
import { Consumer } from '../MyContext'

class AdminBanner extends Component {
  render () {
    return (
      <Consumer>
        { value => {
          const { user } = value
          return user ? (
            <div className="admin-banner">
              <p>admin mode</p>
            </div>
          ) : (
            <div></div>
          )
        }}
      </Consumer>
    )
  }
}

export default AdminBanner
