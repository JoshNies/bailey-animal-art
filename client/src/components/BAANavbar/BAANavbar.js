import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bulma-components/lib/components/navbar'

class BAANavbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  burgerClicked() {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
      <Navbar
        fixed="top"
        active={this.state.open}
        transparent={false}
      >
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">Bailey Animal Art</Navbar.Item>
          <Navbar.Burger
            active={this.state.open.toString()}
            onClick={this.burgerClicked.bind(this)}
          />
        </Navbar.Brand>
        <Navbar.Menu active={this.state.open.toString()}>
          <Navbar.Container position="end">
            <Navbar.Item href="#">custom order</Navbar.Item>
            <Navbar.Item href="#">shop</Navbar.Item>
            <Navbar.Item href="#">about</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    )
  }
}

export default BAANavbar;
