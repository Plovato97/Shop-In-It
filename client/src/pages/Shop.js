import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SHOP } from '../utils/queries';  // Import the getShop query

const ShopPage = props => {
    const {id: shopId} = useParams();
    const { loading, error, data } = useQuery(QUERY_SHOP, { variables: { id: shopId } });  // Execute the getShop query with the shopId variable

    console.log(loading);
    console.log(error);
    console.log(data);

    const shop = data?.shop || {};
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : </p>;

    // Render the shop details
    return (
        <div>
            <h1>{shop.shopTitle}</h1>
            <p>{shop.shopDescription}</p>
            <img src={shop.profilePic} alt="Shop Owner" />
            <p>{shop.shopLocation}</p>
            <img src={shop.shopHero} alt="Shop Hero" />
        </div>
    );
}

export default ShopPage;