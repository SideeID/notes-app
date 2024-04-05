import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';
import PropTypes from 'prop-types';

function LoginPage({ loginSuccess }) {
    const navigate = useNavigate();
    async function onLogin({ password, email }) {
        const { error, data } = await login({ password, email });

        if (!error) {
            loginSuccess(data);
            navigate('/');
        }
    }
    return (
        <section className='login-page'>
            <h1>Login</h1>
            <LoginInput login={onLogin} />
            <p>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
