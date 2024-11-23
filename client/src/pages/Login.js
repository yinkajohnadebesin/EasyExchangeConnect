import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login Page</h1>
            <p>Please enter your credentials to log in.</p>
            <div style={{ marginTop: '20px' }}>
                <button
                    style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => navigate('/Register')}
                >
                    Go to Register
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
