import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import Button from 'react-bulma-components/lib/components/button'
import { Field, Control } from 'react-bulma-components/lib/components/form'
import Box from 'react-bulma-components/lib/components/box'
import Level from 'react-bulma-components/lib/components/level'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Consumer } from '../MyContext'
import GalleryItem from '../GalleryItem'

// import Painting1 from './Painting_1.jpg'
// import Painting2 from './Painting_2.jpg'
// import Painting3 from './Painting_3.jpg'
// import Painting4 from './Painting_4.jpg'
// import Painting5 from './Painting_5.jpg'
// import Painting6 from './Painting_6.jpg'
// import Painting7 from './Painting_7.png'
// import Painting8 from './Painting_8.jpg'
// import Painting9 from './Painting_9.jpg'
// import Painting10 from './Painting_10.jpg'

class Gallery extends Component {
  render () {
    const breakpointColumns = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    return (
      <Consumer>
        { value => {
          const { user } = value
          return (
            <div>
              { user &&
                <Box className="admin-box">
                  <Level renderAs="nav">
                    <Level.Item>
                      <Field className="has-addons">
                        <Control>
                          <Button className="admin-btn is-large">manage featured</Button>
                        </Control>
                        <Control>
                          <Button className="admin-btn is-large"><FontAwesomeIcon icon={faPlus}/> new</Button>
                        </Control>
                      </Field>
                    </Level.Item>
                  </Level>
                </Box>
              }
              <Masonry
                breakpointCols={breakpointColumns}
                className="gallery-masonry-grid"
                columnClassName="gallery-masonry-grid-column"
                >
                {/* <GalleryItem image={Painting1}/>
                <GalleryItem image={Painting2}/>
                <GalleryItem image={Painting3}/>
                <GalleryItem image={Painting4}/>
                <GalleryItem image={Painting5}/>
                <GalleryItem image={Painting6}/>
                <GalleryItem image={Painting7}/>
                <GalleryItem image={Painting8}/>
                <GalleryItem image={Painting9}/>
                <GalleryItem image={Painting10}/> */}
                {this.props.children}
              </Masonry>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Gallery
