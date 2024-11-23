import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Register Page</h1>
            <p>Create an account to join EasyExchange!</p>
            <div style={{ marginTop: '20px' }}>
                <button
                    style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => navigate('/Login')}
                >
                    Go to Login
                </button>
                <button
                    style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Back to Homepage
                </button>
                <button
                    style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => navigate('/Home')}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};
