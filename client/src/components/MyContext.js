import React, { Component } from 'react'
import Fire from '../config/Firebase'

const MyContext = React.createContext()

export class Provider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
        console.log("Logged in as user: " + user)
      } else {
        this.setState({ user: null })
        console.log("Not logged in.")
      }
    })
  }

  // How to call this from consumer?
  logIn(email, password) {
    Fire.auth().signInWithEmailAndPassword(email, password).then( (user) => {
      // this.setState({ user })
    }).catch( (e) => {
      console.log("Firebase Error: " + e)
    })
  }

  logOut() {
    // ...
  }

  render () {
    return (
      <MyContext.Provider
        value={{
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut
        }}
        >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const Consumer = MyContext.Consumer
