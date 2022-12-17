import React from 'react';

function CategoryBox(props) {
    
    const { categoryName, img, alt } = props; //can add link here

    return (
        <article className='wrapper-a'>
            <div className='card'>
                {/* <a target='_blank' rel='noreferrer' className='category-button'> */}
                    <img alt={alt} className='category-img' src={require(`./images/${img}.jpg`)}>
                    </img>
                {/* </a> */}
                <div className='category-text'>
                    <h2 className='category-title-a'>{categoryName}</h2>
                </div>
            </div>
        </article>
    )
};

export default CategoryBox;