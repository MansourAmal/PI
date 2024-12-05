import React from 'react'
import Welcame from './welcame';
import About from './about';
import Testimonial from './testimonial';
import { Container } from 'reactstrap';

const home = () => {

  return (
    <div>
     
        <Welcame/>
        <About/>
        <Testimonial/>
    </div>
  )
}

export default home
