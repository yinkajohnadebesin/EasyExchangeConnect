import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }

            try {
                const response = await axios.get('http://localhost:3001/user/profile', {
                    headers: { Authorization: token }
                });
                setUser(response.data);
            } catch (err) {
                setError('Failed to fetch user profile. Please log in again.');
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        
        fetchUserProfile();
    }, [navigate]);

    return (
        <div>
            <h1>Welcome</h1>
            {error && <p>{error}</p>}
            {user ? <h2>Hello, {user.Student_FirstName}!</h2> : <p>Loading...</p>}
        </div>
    );
}

export default Welcome;
