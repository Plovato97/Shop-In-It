import React from 'react';
import Link from 'react-router-dom';
import './hero.css';

import nintendo from './images/Nintendo-Switch-PNG.png';

const Hero = () => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='nintendo'>Nintendo Switch</p>
            <h3>Holiday Sale</h3>
            <img src={nintendo} alt='nintendo-swith' className='hero-banner-image'/>

            <div>
                {/* <Link href='/product/Id'> */}
                    <button type='button'>Check it out!</button>
                {/* </Link> */}
                <div className='desc'>
                    <h5>Best Selling - Nintendo Switch</h5>
                    <p>Nintendo Switch with Neon Red/Neon Blue Joy-Con Controllers and Mario Kart 8 Deluxe Bundle</p>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Hero;