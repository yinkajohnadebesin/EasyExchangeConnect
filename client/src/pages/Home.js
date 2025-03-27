import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate()

    return (
        <div>
            <p>Homepage</p>
            <p>This is the first page both admins and users see when they enter the website</p>
            <p>this will have a login and register page for both users</p>
            <button onClick={() => navigate('/Universities')}>See universities</button>
            <button onClick={() => navigate('/Login')}>For Students</button>
            <button onClick={() => navigate('/admin-login')}>For Lecturers</button>
        </div>
    );
}