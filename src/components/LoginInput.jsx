import React from 'react';
import PropTypes from 'prop-types';
import useInputChange from './useInputChange';

const LoginInput = ({ login }) => {
    const [email, handleEmailChange] = useInputChange();
    const [password, handlePasswordChange] = useInputChange();
    const [confirmPassword, handleConfirmPasswordChange] = useInputChange();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak sesuai.');
            return;
        }
        login({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className='login-input'>
            <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
                autoComplete='username'
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
                autoComplete='new-password'
            />
            <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete='new-password'
            />
            <button type='submit'>Login</button>
        </form>
    );
};

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginInput;
