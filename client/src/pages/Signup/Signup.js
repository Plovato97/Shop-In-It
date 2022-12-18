import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import './Signup.css';

function Signup(props) {
    //Sign in Function
    const [formState, setFormState] = useState({username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email,
                password: formState.password,
                username: formState.username
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Modal Function
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

    return (
    <>
        <div className='container my-1'>
            <Link to='/login'>Login</Link>

            
            <form onSubmit={handleFormSubmit} className='modal-content'>
            <h2>Sign Up</h2>
                <div className='flex-row space-between my-2 user'>
                    <label htmlFor='username'>Username</label>
                    <input 
                        placeholder='Username'
                        name='username'
                        type='username'
                        id='username'
                        onChange={handleChange} 
                    />
                </div>
                <div className="flex-row space-between my-2 user">
                    <label htmlFor="email">Email:</label>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2 user">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row flex-end">
                    <button type="submit" className='submit-btn'>Submit</button>
                </div>
                
                  <Link to='/' className='close-modal'>Close</Link>
                 
            </form>
        </div>
    </>
    );
};

export default Signup;