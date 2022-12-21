import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SHOP } from '../utils/mutations';  // Import the addShop mutation
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Shop/shop.css';


function AddShop() {
    const [addShop] = useMutation(ADD_SHOP);  // Declare the addShop function using the useMutation hook

    const [shopTitle, setShopTitle] = useState('');  // Declare state variables to store the shop fields
    const [shopDescription, setShopDescription] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [shopLocation, setShopLocation] = useState('');
    const [shopHero, setShopHero] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addShop({  // Call the addShop function and pass the shop fields as arguments
                variables: {
                    shopTitle,
                    shopDescription,
                    profilePic,
                    shopLocation,
                    shopHero,
                },
            });
            console.log(data);  // Log the returned data to the console

            
            
            navigate.push(`/shop/${data.addShop._id}`);
        } catch (err) {
            console.error(err);
        }
    };

    // Modal Function
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (

            <form onSubmit={handleSubmit} className='modal-content-w'>

                {/* Render a form that allows the user to enter the shop fields */}
                {/* <label htmlFor='shopTitle'>Shop Title:</label> */}
                <input
                    placeholder='Shop Title'
                    type='title'
                    value={shopTitle}
                    onChange={(event) => setShopTitle(event.target.value)}
                />
                {/* <label htmlFor='shopDescription'>Shop Description:</label> */}
                <input
                    placeholder='Shop Description'
                    type='Description'
                    value={shopDescription}
                    onChange={(event) => setShopDescription(event.target.value)}
                />
                {/* <label htmlFor='profilePic'>Profile Picture:</label> */}
                <input
                    placeholder='Profile Picture'
                    type='ProfilePic'
                    value={profilePic}
                    onChange={(event) => setProfilePic(event.target.value)}
                />
                {/* <label htmlFor='shopLocation'>Shop Location:</label> */}
                <input
                    placeholder='Shop Location'
                    type='location'
                    value={shopLocation}
                    onChange={(event) => setShopLocation(event.target.value)}
                />
                {/* <label htmlFor='shopHero'>Shop Hero:</label> */}
                <input
                    placeholder='Shop Hero'
                    type='hero'
                    value={shopHero}
                    onChange={(event) => setShopHero(event.target.value)}
                />
                {/* <div className="flex-row flex-end">
        <button type='submit' >Create Shop</button>
      </div> */}
                <Link to="/shop/:id" className='create-shop-button'>Create Shop</Link>
            </form>
    );
}

export default AddShop;