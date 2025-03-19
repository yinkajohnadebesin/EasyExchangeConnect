import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { patterns } from '../utils/validation';
import '../css/patterns_css.css'

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Student_ID: '',
        Student_FirstName: '',
        Student_LastName: '',
        Student_Email: '',
        Student_Username: '',
        Student_DOB: '',
        Student_Password: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if(patterns[name] && !patterns[name].test(value)) {
            setError(``);
        }
        else {
            setError('');
        }
        
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:3001/register', formData);

            if (response.status === 201) {
                setSuccessMessage('Registration successful!');
                navigate('/Login'); // Redirect to login after successful registration
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <p>Create an account to join EasyExchange!</p>
            {error && <p>{error}</p>}
            {successMessage && <p></p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="Student_ID" placeholder="Student ID" value={formData.Student_ID} onChange={handleChange} required />
                <p>This must be your Technological University of Dublin student ID number (e.g. C20426814)</p>
                <input type="text" name="Student_FirstName" placeholder="First Name" value={formData.Student_FirstName} onChange={handleChange} required /><br />
                <input type="text" name="Student_LastName" placeholder="Surname" value={formData.Student_LastName} onChange={handleChange} required /><br />
                <input type="email" name="Student_Email" placeholder="Email Address" value={formData.Student_Email} onChange={handleChange} required /><br />
                <p>Email must be a valid Technological University of Sublin email address, e.g. c20426814@mytudublin.ie</p>
                <input type="text" name="Student_Username" placeholder="Username" value={formData.Student_Username} onChange={handleChange} required /><br />
                <p>Username must contain only lowercase letters, numbers and hyphens and be 8 - 20 characters</p>
                <input type="date" name="Student_DOB" placeholder="Date of Birth" value={formData.Student_DOB} onChange={handleChange} required /><br /><br />
                <input type="password" name="Student_Password" placeholder="password" value={formData.Student_Password} onChange={handleChange} required /><br /><br />
                <button type="submit">Register</button>
            </form>
            <br /><br />
            <button onClick={() => navigate('/Login')} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Go to Login</button>
            <button onClick={() => navigate('/')} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Back to Homepage</button>
        </div>
    );
}

export default Register;