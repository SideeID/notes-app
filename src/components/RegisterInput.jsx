import React from 'react';
import PropTypes from 'prop-types';
import useInputChange from './useInputChange';

const RegisterInput = ({ register }) => {
    const [name, handleNameChange] = useInputChange();
    const [email, handleEmailChange] = useInputChange();
    const [password, handlePasswordChange] = useInputChange();

    const handleSubmit = (e) => {
        e.preventDefault();
        register({ name, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className='register-input'>
            <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={handleNameChange}
            />
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
                autoComplete='email'
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
                autoComplete='current-password'
            />
            <button type='submit'>Register</button>
        </form>
    );
};

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterInput;
