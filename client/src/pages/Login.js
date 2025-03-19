// /frontend/pages/Login.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Student_Email: '',
        Student_Password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('http://localhost:3001/auth/login', formData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store JWT in localStorage
                navigate('/welcome'); // Redirect to welcome page
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="Student_Email" placeholder="Email" value={formData.Student_Email} onChange={handleChange} required /><br />
                <input type="password" name="Student_Password" placeholder="Password" value={formData.Student_Password} onChange={handleChange} required /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
