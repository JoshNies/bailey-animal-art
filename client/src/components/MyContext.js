import React, { Component } from 'react'
import Fire from '../config/Firebase'

const MyContext = React.createContext()

const db = Fire.firestore()
const storage = Fire.storage()

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

  // Listens for auth state changes, automatically sets state user object
  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  logIn(email, password) {
    Fire.auth().signInWithEmailAndPassword(email, password).then( (user) => {
    }).catch( (e) => {
      console.log("Firebase Error: " + e)
    })
  }

  logOut() {
    Fire.auth().signOut()
  }

  render () {
    return (
      <MyContext.Provider
        value={{
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut,
          db: db,
          storage: storage
        }}
        >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export const Consumer = MyContext.Consumer
