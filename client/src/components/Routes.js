import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import About from './pages/About'
import GalleryItemDetails from './pages/GalleryItemDetails'
import Shop from './pages/Shop'
import CustomOrder from './pages/CustomOrder'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/admin' component={AdminLogin}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/gallery/:itemId' component={GalleryItemDetails}/>
        <Route exact path='/shop' component={Shop}/>
        <Route exact path='/custom-order' component={CustomOrder}/>
        <Route exact path='/checkout/:itemId' component={Checkout}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Routes;
