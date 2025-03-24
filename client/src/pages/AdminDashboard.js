// /frontend/pages/AdminDashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdminProfile = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin-login'); // Redirect to admin login if no token
                return;
            }

            try {
                const response = await axios.get('http://localhost:3001/admin/profile', {
                    headers: { Authorization: token }
                });
                setAdmin(response.data);
            } catch (err) {
                setError('Failed to fetch admin profile. Please log in again.');
                localStorage.removeItem('adminToken');
                navigate('/admin-login');
            }
        };
        
        fetchAdminProfile();
    }, [navigate]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p>{error}</p>}
            {admin ? <h2>Welcome, {admin.Lecturer_FirstName}!</h2> : <p>Loading...</p>}
            <button onClick={() => {
                localStorage.removeItem('adminToken');
                navigate('/admin-login');
            }}>Logout</button>
        </div>
    );
}

export default AdminDashboard;
