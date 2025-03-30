// /frontend/pages/AdminCreateUniversity.js
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminCreateUniversity() {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [form, setForm] = useState({
        country_id: '',
        new_country: '',
        city_id: '',
        new_city: '',
        university_name: '',
        title: '',
        description: ''
    });

    const [showNewCountry, setShowNewCountry] = useState(false);
    const [showNewCity, setShowNewCity] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/countries').then(res => setCountries(res.data));
        axios.get('http://localhost:3001/cities').then(res => setCities(res.data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
    
        try {
            const payload = {
                University_Name: form.university_name,
                Title: form.title,
                Description: form.description,
                City_ID: form.city_id,
                new_city: form.new_city,
                new_country: form.new_country,
                country_id: form.country_id
            };
    
            const response = await axios.post('http://localhost:3001/admin/universities', payload, {
                headers: { Authorization: localStorage.getItem("adminToken") }
            });
    
            if (response.status === 201) {
                setMessage('University created successfully!');
                setForm({
                    country_id: '', new_country: '', city_id: '', new_city: '',
                    university_name: '', title: '', description: ''
                });
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };
    
    return (
        <div>
            <h1>Create New University</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Country:</label>
                {!showNewCountry ? (
                    <select name="country_id" value={form.country_id} onChange={handleChange} required>
                        <option value="">-- Select Country --</option>
                        {countries.map(c => (
                            <option key={c.Country_ID} value={c.Country_ID}>{c.Country_Name}</option>
                        ))}
                    </select>
                ) : (
                    <input type="text" name="new_country" placeholder="New Country Name" value={form.new_country} onChange={handleChange} required />
                )}
                <button type="button" onClick={() => setShowNewCountry(!showNewCountry)}>
                    {showNewCountry ? 'Use Existing Country' : 'Add New Country'}
                </button>

                <br /><br />

                <label>City:</label>
                {!showNewCity ? (
                    <select name="city_id" value={form.city_id} onChange={handleChange} required>
                        <option value="">-- Select City --</option>
                        {cities.map(c => (
                            <option key={c.City_ID} value={c.City_ID}>{c.City_Name}</option>
                        ))}
                    </select>
                ) : (
                    <input type="text" name="new_city" placeholder="New City Name" value={form.new_city} onChange={handleChange} required />
                )}
                <button type="button" onClick={() => setShowNewCity(!showNewCity)}>
                    {showNewCity ? 'Use Existing City' : 'Add New City'}
                </button>

                <br /><br />

                <input type="text" name="university_name" placeholder="University Name" value={form.university_name} onChange={handleChange} required /><br />
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} /><br />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />

                <button type="submit">Create University</button>
            </form>
        </div>
    );
}

export default AdminCreateUniversity;