// /frontend/pages/Universities.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Universities() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/universities')
            .then(res => {
                setUniversities(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching universities:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading universities...</p>;

    return (
        <div>
            <h1>Explore Partner Universities</h1>
            <ul>
                {universities.map(uni => (
                    <li key={uni.University_ID}>
                        <h2>{uni.University_Name}</h2>
                        <p><strong>{uni.Title}</strong></p>
                        <p>Location: {uni.City_Name}, {uni.Country_Name}</p>
                        <button onClick={() => navigate(`/universities/${uni.University_ID}`)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Universities;