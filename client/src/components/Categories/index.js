import React from 'react';

import './categories.css';
import CategoryBox from './categorybox';

function Categories () {

    // add code for functioning categories
    const category = [
        {
            categoryName: 'Electronics',
            img: 'iphonecat',
            alt: 'picture of iphone'
        },
        {
            categoryName: 'Fashion',
            img: 'clothing',
            alt: 'picture of clothing'
        },
        {
            categoryName: 'Home Decor',
            img: 'homedecor',
            alt: 'picture of furniture'
        },
        {
            categoryName: 'Children',
            img: 'kids',
            alt: 'picture of kids playing'
        },
        {
            categoryName: 'Holiday',
            img: 'christmas',
            alt: 'picture of christmas'
        },
    ];

    return(
        <div className='background'>
            <div>
                <h1>Some of the things we offer.</h1>
            </div>
            <section>
                <div className='category'>
                    {category.map((el, i) => (
                        <div key={i} className='row-a'> 
                            <CategoryBox
                                categoryName = {el.categoryName}
                                img = {el.img}
                                alt = {el.alt}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Categories;