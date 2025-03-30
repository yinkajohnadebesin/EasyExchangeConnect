// /frontend/pages/Universities.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const isAdminLoggedIn = localStorage.getItem("adminToken") !== null;

function Universities() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDelete = async (universityId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this university from the list?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:3001/universities/${universityId}`, {
            headers: { Authorization: localStorage.getItem("adminToken") }
        });
        console.log("Trying to delete university ID:", universityId);

        alert("University deleted successfully");

        setUniversities(prev => prev.filter(u => u.University_ID !== universityId));

    } catch (err) {
        console.error("Failed to delete university", err.response?.data || err.message);
        alert(err.response?.data?.message || "Failed to delete university");
    }
};

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
                        {isAdminLoggedIn && (<button onClick={() => handleDelete(uni.University_ID)}>Delete</button>)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Universities;