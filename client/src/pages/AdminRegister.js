import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Lecturer_ID: '',
        Lecturer_FirstName: '',
        Lecturer_LastName: '',
        Lecturer_Email: '',
        Lecturer_Username: '',
        Lecturer_DOB: '',
        Lecturer_Password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3001/admin/register', formData);
            if (response.status === 201) {
                setSuccessMessage('Registration successful!');
                navigate('/admin-login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Admin Registration</h1>
            <p>Create an admin account to access the dashboard.</p>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="Lecturer_ID" placeholder="Lecturer ID" value={formData.Lecturer_ID} onChange={handleChange} required /><br />
                <input type="text" name="Lecturer_FirstName" placeholder="First Name" value={formData.Lecturer_FirstName} onChange={handleChange} required /><br />
                <input type="text" name="Lecturer_LastName" placeholder="Last Name" value={formData.Lecturer_LastName} onChange={handleChange} required /><br />
                <input type="email" name="Lecturer_Email" placeholder="Email" value={formData.Lecturer_Email} onChange={handleChange} required /><br />
                <input type="text" name="Lecturer_Username" placeholder="Username" value={formData.Lecturer_Username} onChange={handleChange} required /><br />
                <input type="date" name="Lecturer_DOB" placeholder="Date of Birth" value={formData.Lecturer_DOB} onChange={handleChange} required /><br />
                <input type="password" name="Lecturer_Password" placeholder="Password" value={formData.Lecturer_Password} onChange={handleChange} required /><br /><br />
                <button type="submit">Register</button>
            </form>
            <br />
            <button onClick={() => navigate('/admin-login')}>Go to Login</button>
        </div>
    );
}

export default AdminRegister;
