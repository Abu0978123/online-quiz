import React from 'react'
import { Carousel, Button } from 'react-bootstrap'
import back from './images/back.jpg'
import slider7 from './images/slider7.jpg'
import slider8 from './images/slider8.jpg'
import slider9 from './images/slider9.jpg'
import slidera from './images/a.jpg'

import '../styles/slider.css'

const Slider = () => {
  return (
    <div className='slider'>
      <Carousel >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={back}
            alt="First slide"
          />
          <Carousel.Caption >
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Button variant="outline-primary">Primary</Button>

          </Carousel.Caption>
        </Carousel.Item>
      
      
      
      </Carousel>
    </div>
  )
}

export default Slider