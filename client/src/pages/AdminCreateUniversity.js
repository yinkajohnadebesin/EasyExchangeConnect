import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminCreateUniversity() {
  const navigate = useNavigate();

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
  
  // fetch countries and cities
  useEffect(() => {
    axios.get('http://localhost:3001/countries').then(res => setCountries(res.data));
    axios.get('http://localhost:3001/cities').then(res => setCities(res.data));
  }, []);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle form submission FOR CREATING THE UNIVERSITY
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

      // sent the inputted data payload to the backend
      const response = await axios.post('http://localhost:3001/admin/universities', payload, {
        headers: { Authorization: localStorage.getItem("adminToken") }
      });

      if (response.status === 201) {
        // successful creation of the university
        setMessage('University created successfully!');
        setForm({
          country_id: '', new_country: '', city_id: '', new_city: '',
          university_name: '', title: '', description: ''
        });
      }
    } catch (error) {
      // handle error response
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 font-nunito">
      <h1 className="text-4xl font-bold mb-6">Create New University</h1>

      {message && (
        <p className="mb-4 font-semibold text-green-600">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Country Field */}
        <div>
          <label className="block font-semibold mb-1">Country:</label>
          {!showNewCountry ? (
            <select
              name="country_id"
              value={form.country_id}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border"
            >
              <option value="">-- Select Country --</option>
              {countries.map(c => (
                <option key={c.Country_ID} value={c.Country_ID}>{c.Country_Name}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="new_country"
              placeholder="New Country Name"
              value={form.new_country}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border"
            />
          )}
          <button
            type="button"
            onClick={() => setShowNewCountry(!showNewCountry)}
            className="mt-2 text-sm text-blue-600 underline"
          >
            {showNewCountry ? 'Use Existing Country' : 'Add New Country'}
          </button>
        </div>

        {/* City Field */}
        <div>
          <label className="block font-semibold mb-1">City:</label>
          {!showNewCity ? (
            <select
              name="city_id"
              value={form.city_id}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border"
            >
              <option value="">-- Select City --</option>
              {cities.map(c => (
                <option key={c.City_ID} value={c.City_ID}>{c.City_Name}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="new_city"
              placeholder="New City Name"
              value={form.new_city}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border"
            />
          )}
          <button
            type="button"
            onClick={() => setShowNewCity(!showNewCity)}
            className="mt-2 text-sm text-blue-600 underline"
          >
            {showNewCity ? 'Use Existing City' : 'Add New City'}
          </button>
        </div>

        {/* University Info */}
        <div>
          <input
            type="text"
            name="university_name"
            placeholder="University Name"
            value={form.university_name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border"
          />
        </div>

        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
          >
            Create University
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminCreateUniversity;
