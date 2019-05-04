import React, { Component } from 'react'
import Columns from 'react-bulma-components/lib/components/columns'
import {
  Field,
  Control,
  Label,
  Input
} from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'
import { Consumer } from '../../MyContext'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'

class AdminLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  onLogInClicked = (evt, logIn) => {
    // Log in
    evt.preventDefault()
    logIn(this.state.username, this.state.password)
  }

  render () {
    return (
      <Consumer>
        { value => {
          const { user, logIn, logOut } = value
          return (
            <div className="baa-container">
              <div className="baa-content">
                <BAANavbar/>
                <Columns>
                  <Columns.Column></Columns.Column>
                  <Columns.Column size="half">
                    <div className="login-container">
                      <h1>Admin Login</h1>
                      <div className="login-inputs-container">
                        <Field>
                          <Label>Username</Label>
                          <Control>
                            <Input
                              name="username"
                              type="text"
                              placeholder="username"
                              value={this.state.username}
                              onChange={this.onInputChange}
                              />
                          </Control>
                        </Field>
                        <Field>
                          <Label>Password</Label>
                          <Control>
                            <Input
                              name="password"
                              type="password"
                              placeholder="password"
                              value={this.state.password}
                              onChange={this.onInputChange}
                              />
                          </Control>
                        </Field>
                        <Button
                          className="login-btn is-size-5"
                          onClick={event => this.onLogInClicked(event, logIn)}
                          >
                          log in
                        </Button>
                      </div>
                    </div>
                  </Columns.Column>
                  <Columns.Column></Columns.Column>
                </Columns>
              </div>
              <BAAFooter/>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AdminLogin
