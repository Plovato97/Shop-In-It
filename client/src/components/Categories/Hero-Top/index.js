import React from 'react';
import Link from 'react-router-dom';
import './hero.css';

import nintendo from './images/Nintendo-Switch-PNG.png';

const Hero = () => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='nintendo'>Small Text</p>
            <h3>Mid Text</h3>
            <img src={nintendo} alt='nintendo-swith' className='hero-banner-image'/>

            <div>
                {/* <Link href='/product/Id'> */}
                    <button type='button'>Button Text</button>
                {/* </Link> */}
                <div className='desc'>
                    <h5>Description</h5>
                    <p>DESCRIPTION</p>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Hero;