import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate()

    return (
        <div>
            <p>Homepage</p>
            <button 
                style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                onClick={() => navigate('/Universities')}
            >
                See universities
            </button>
        </div>
    );
}