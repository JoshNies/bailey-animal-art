import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bulma-components/lib/components/button'

class Home extends Component {
  render () {
    return (
      <div className="home">
        <h1>Home page</h1>
        <Button color="primary">My first button!</Button>
      </div>
    )
  }
}

export default Home;
