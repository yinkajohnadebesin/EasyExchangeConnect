import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState('');

    // Check if admin is logged in and fetch profile
    useEffect(() => {
        const fetchAdminProfile = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin-login');
                return;
            }

            try {
                // Fetch admin profile using the token
                const response = await axios.get('http://localhost:3001/admin/profile', {
                    headers: { Authorization: token }
                });
                setAdmin(response.data);
            } catch (err) {
                // Handle error if token is invalid or expired
                setError('Failed to fetch admin profile. Please log in again.');
                localStorage.removeItem('adminToken');
                navigate('/admin-login');
            }
        };
        
        fetchAdminProfile();
    }, [navigate]);

    return (
        <div className="mt-5">
            {error && <p>{error}</p>}
            {admin ? <h2>Welcome, {admin.Lecturer_FirstName}! Are you ready to manage student applications and universities?</h2> : <p>Loading...</p>}
            <button 
                onClick={() => navigate('/universities')}
                className="btn btn-primary mt-3"
            >
            Manage Universities
            </button>
        </div>
    );
}

export default AdminDashboard;
