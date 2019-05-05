import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import About from './pages/About'
import GalleryItemDetails from './pages/GalleryItemDetails'
import NotFound from './pages/NotFound'

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/admin' component={AdminLogin}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/gallery/:itemId' component={GalleryItemDetails}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Routes;
