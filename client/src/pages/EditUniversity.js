import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUniversityDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [cities, setCities] = useState([]);
    
    const [programmeCodes, setProgrammeCodes] = useState([]);
    const [newProgrammeCode, setNewProgrammeCode] = useState('');

    const [form, setForm] = useState({
        University_Name: "",
        Title: "",
        Description: "",
        City_ID: "",
        Caption: ""
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/universities/${id}`).then(res => {
            const data = res.data;
            setForm({
                University_Name: data.University_Name || "",
                Title: data.Title || "",
                Description: data.Description || "",
                City_ID: data.City_ID || "",
                Caption: data.Caption || ""
            });
            setProgrammeCodes(data.Programmes || []);
            setLoading(false);
        });
    
        axios.get(`http://localhost:3001/cities`).then(res => {
            setCities(res.data);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Update the new update of university and send it to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const formData = new FormData();
        formData.append("City_ID", form.City_ID);
        formData.append("University_Name", form.University_Name);
        formData.append("Title", form.Title);
        formData.append("Description", form.Description);
        if (imageFile) {
            formData.append("Image", imageFile);
            formData.append("Caption", form.Caption);
        }

        try {
            const response = await axios.put(
                `http://localhost:3001/universities/edit/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: localStorage.getItem("adminToken")
                    }
                }
            );

            if (response.status === 200) {
                setMessage("University updated successfully!");
                setImageFile(null);
            }
        } catch (err) {
            console.error("Error updating university:", err);
            setMessage(err.response?.data?.message || "An error occurred.");
        }
    };

    // Add new programme code to the university and send it to backend
    const handleAddProgrammeCode = async (e) => {
        e.preventDefault();
    
        if (!newProgrammeCode.trim()) return;
    
        try {
            const res = await axios.post(
                `http://localhost:3001/universities/edit/${id}/programmes`,
                { Programme_Code: newProgrammeCode },
                {
                    headers: {
                        Authorization: localStorage.getItem("adminToken"),
                    },
                }
            );
    
            setProgrammeCodes(res.data.codes); // Update state with refreshed list
            setNewProgrammeCode(""); // Clear input
        } catch (err) {
            console.error("Error adding programme code:", err);
            alert("Failed to add programme code.");
        }
    };

    // Delete programme code from the university and send it to backend
    const handleDeleteUniProgrammeCode = async (codeToDelete) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete programme code "${codeToDelete}"?`);
        if (!confirmDelete) return;
    
        try {
            const res = await axios.delete(
                `http://localhost:3001/universities/edit/${id}/programmes/${codeToDelete}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("adminToken"),
                    },
                }
            );
    
            setProgrammeCodes(res.data.codes);
        } catch (err) {
            console.error("Error deleting programme code:", err);
            alert("Failed to delete programme code.");
        }
    };

    // If page is not rendering, show loading message
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Update University Details</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Select City:
                    <select name="City_ID" value={form.City_ID} onChange={handleChange} required>
                        <option value="">Select a city</option>
                        {cities.map(city => (
                            <option key={city.City_ID} value={city.City_ID}>
                                {city.City_Name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    University Name:
                    <input
                        type="text"
                        name="University_Name"
                        value={form.University_Name}
                        onChange={handleChange}
                        required
                    />
                </label><br />

                <label>
                    Title:
                    <input
                        type="text"
                        name="Title"
                        value={form.Title}
                        onChange={handleChange}
                    />
                </label><br />

                <label>
                    Description:
                    <textarea
                        name="Description"
                        value={form.Description}
                        onChange={handleChange}
                    />
                </label><br />
                <label>

                </label>

                <label>
                    Upload Image:
                    <input
                        type="file"
                        name="Image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </label><br />

                <label>
                    Caption:
                    <input
                        type="text"
                        name="Caption"
                        value={form.Caption}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Update University</button>
                <button type="button" onClick={() => navigate(-1)}>Back</button>
            </form>
            <hr />
            <h2>Add Programme Code</h2>
            <form onSubmit={handleAddProgrammeCode}>
                <input
                    type="text"
                    value={newProgrammeCode}
                    onChange={(e) => setNewProgrammeCode(e.target.value)}
                    placeholder="Enter new programme code"
                />
                <button type="submit">Add Programme</button>
            </form>

            <h3>Current Programme Codes:</h3>
            <ul>
                {programmeCodes.map((code, index) => (
                    <li key={index}>
                        {code}
                        <button onClick={() => handleDeleteUniProgrammeCode(code)} style={{ marginLeft: "1rem", color: "red" }}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default UpdateUniversityDetails;