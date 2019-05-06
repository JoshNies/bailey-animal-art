import React, { Component } from 'react'
import Img from 'react-image'
import Columns from 'react-bulma-components/lib/components/columns'
import BAANavbar from '../../BAANavbar'
import BAAFooter from '../../BAAFooter'
import SelfPhoto from './teresa.jpg'
import FacebookIcon from './facebook_icon.png'

class About extends Component {
  render () {
    return (
      <div className="baa-container">
        <div className="baa-content">
          <BAANavbar/>
          <Columns>
            <Columns.Column></Columns.Column>
            <Columns.Column size="half" className="about-container">
              <Img
                src={SelfPhoto}
                alt="Teresa Bailey"
                className="about-selfphoto"
                />
              <h1>Teresa Bailey</h1>
              <h2>About Me</h2>
              <a
                href="https://www.facebook.com/TeresaBaileyAnimalArtist/"
                target="_blank"
                >
                <Img
                  src={FacebookIcon}
                  alt="Facebook: https://www.facebook.com/TeresaBaileyAnimalArtist/"
                  className="about-facebook"
                  />
              </a>
              <p>
                I am a self-taught artist with a life long love of all animals,
                although I do have a special affinity for the Dalmatian dog. If
                you have questions or would like to commission a custom portrait
                of your pet, please contact me through Custom Order.  You can
                follow the progress of any portrait or painting on my Facebook
                page.
              </p>
            </Columns.Column>
            <Columns.Column></Columns.Column>
          </Columns>
        </div>
        <BAAFooter/>
      </div>
    )
  }
}

export default About;
