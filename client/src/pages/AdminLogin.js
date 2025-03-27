// /frontend/pages/AdminLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Lecturer_Email: '',
        Lecturer_Password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('http://localhost:3001/admin/login', formData);
            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token); // Store JWT in localStorage
                navigate('/admin/dashboard'); // Redirect to admin dashboard
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="Lecturer_Email" placeholder="Email" value={formData.Lecturer_Email} onChange={handleChange} required /><br />
                <input type="password" name="Lecturer_Password" placeholder="Password" value={formData.Lecturer_Password} onChange={handleChange} required /><br />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate('/admin-register')}>Sign up As a Lecturer</button>
        </div>
    );
}

export default AdminLogin;
