import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bulma-components/lib/components/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faPalette } from '@fortawesome/free-solid-svg-icons'
import { Consumer } from '../MyContext'

class BAANavbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  onBurgerClicked = () => {
    this.setState({
      open: !this.state.open
    })
  }

  onLogOutClicked = (evt, logOut) => {
    evt.preventDefault()
    logOut()
  }

  render () {
    const iconMargin = "0.5rem"

    return (
      <Consumer>
        { value => {
          const { user, logOut } = value
          return (
            <Navbar
              fixed="top"
              active={this.state.open}
              transparent={false}
            >
              <Navbar.Brand>
                <Navbar.Item renderAs="a" href="/">Bailey Animal Art</Navbar.Item>
                <Navbar.Burger
                  active={this.state.open.toString()}
                  onClick={this.onBurgerClicked}
                />
              </Navbar.Brand>
              <Navbar.Menu active={this.state.open.toString()}>
                <Navbar.Container position="end">
                  <Navbar.Item href="/custom-order">
                    <FontAwesomeIcon icon={faPalette} size="lg"/>
                    custom order
                  </Navbar.Item>
                  <Navbar.Item href="/shop">
                    <FontAwesomeIcon icon={faShoppingBag} size="lg"/>
                    shop
                    </Navbar.Item>
                  <Navbar.Item href="/about">about</Navbar.Item>
                  { user &&
                    <Navbar.Item onClick={event => this.onLogOutClicked(event, logOut)}>log out</Navbar.Item>
                  }
                </Navbar.Container>
              </Navbar.Menu>
            </Navbar>
          )
        }}
      </Consumer>
    )
  }
}

export default BAANavbar;
