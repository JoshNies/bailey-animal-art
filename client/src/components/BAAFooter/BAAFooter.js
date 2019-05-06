import React, { Component } from 'react'
import Img from 'react-image'
import PawImage from './BaileyPaw.png'

class BAAFooter extends Component {
  render () {
    return (
      <div className="baa-footer">
        <Img src={PawImage} alt="Bailey Animal Art"/>
        <p>Copyright © 2019 Bailey Animal Art.  All Rights Reserved.</p>
      </div>
    )
  }
}

export default BAAFooter
