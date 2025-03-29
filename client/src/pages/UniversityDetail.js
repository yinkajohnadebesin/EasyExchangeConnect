// /frontend/pages/UniversityDetail.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UniversityDetail() {
    const { id } = useParams();
    const [university, setUniversity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/universities/${id}`)
            .then(res => {
                setUniversity(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching university:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading university details...</p>;
    if (!university) return <p>University not found.</p>;

    return (
        <div>
            <h1>{university.University_Name}</h1>
            <h3>{university.Title}</h3>
            <p><strong>Location:</strong> {university.City_Name}, {university.Country_Name}</p>
            <p>{university.Description}</p>

            <h4>Eligible Programme Codes</h4>
            <ul>
                {university.Programmes.map((code, index) => (
                    <li key={index}>{code}</li>
                ))}
            </ul>

            <h4>Gallery</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {university.Images.map((img, index) => (
                    <div key={index}>
                        <img src={img.Image_URL} alt={img.Caption || 'University Image'} style={{ width: '300px' }} />
                        <p>{img.Caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UniversityDetail;
