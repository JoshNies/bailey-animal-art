import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import About from './pages/About'

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/admin' component={AdminLogin}/>
        <Route path='/about' component={About}/>
      </Switch>
    )
  }
}

export default Routes;
