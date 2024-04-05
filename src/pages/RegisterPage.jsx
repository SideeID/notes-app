import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';

function RegisterPage() {
    const navigate = useNavigate();

    async function onRegisterHandler(user) {
        const { error } = await register(user);

        if (!error) {
            navigate('/login');
        }
    }

    return (
        <section className='register-page'>
            <h1>Register</h1>
            <RegisterInput register={onRegisterHandler} />
            <p>
                Already have an account? <Link to='/login'>Login</Link>
            </p>
        </section>
    );
}

export default RegisterPage;
