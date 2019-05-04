import React, { Component } from 'react'
import Masonry from 'react-masonry-css'
import GalleryItem from '../GalleryItem'

import Painting1 from './Painting_1.jpg'
import Painting2 from './Painting_2.jpg'
import Painting3 from './Painting_3.jpg'
import Painting4 from './Painting_4.jpg'
import Painting5 from './Painting_5.jpg'
import Painting6 from './Painting_6.jpg'
import Painting7 from './Painting_7.png'
import Painting8 from './Painting_8.jpg'
import Painting9 from './Painting_9.jpg'
import Painting10 from './Painting_10.jpg'

class Gallery extends Component {
  render () {
    const breakpointColumns = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    return (
      <Masonry
        breakpointCols={breakpointColumns}
        className="gallery-masonry-grid"
        columnClassName="gallery-masonry-grid-column"
        >
        <GalleryItem image={Painting1}/>
        <GalleryItem image={Painting2}/>
        <GalleryItem image={Painting3}/>
        <GalleryItem image={Painting4}/>
        <GalleryItem image={Painting5}/>
        <GalleryItem image={Painting6}/>
        <GalleryItem image={Painting7}/>
        <GalleryItem image={Painting8}/>
        <GalleryItem image={Painting9}/>
        <GalleryItem image={Painting10}/>
      </Masonry>
    )
  }
}

export default Gallery
