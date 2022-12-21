import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './Signup/Signup.css';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
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
        <div className="container my-1">
            <Link to="/signup">Signup</Link>

            <form onSubmit={handleFormSubmit} className='modal-content-l'>
            <h2>Login</h2>
                <div className="flex-row space-between my-2 user">
                    {/* <label htmlFor="email">Email address:</label> */}
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2 user">
                    {/* <label htmlFor="pwd">Password:</label> */}
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                </div>
                {error ? (
                    <div>
                        <p className="error-text">The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div className="flex-row flex-end">
                    <button type="submit" className='submit-btn'>Submit</button>
                </div>
                <Link to='/' className='close-modal'>Close</Link>
            </form>
        </div>
        </>
    );
};

export default Login;