import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome Page EasyExchange Connect</h1>
            <p>Welcome to EasyExchange! Please choose an option below:</p>
            <div style={{ marginTop: '20px' }}>
                <button
                    style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => navigate('/Login')}
                >
                    Login
                </button>
                <button
                    style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => navigate('/Register')}
                >
                    Register
                </button>
            </div>
        </div>
    );
};
