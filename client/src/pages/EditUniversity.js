import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UD_Background from "../assets/statics/UD_Background.jpg";
import { FileUpload } from "../components/ui/file-upload";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";

function UpdateUniversityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [programmeCodes, setProgrammeCodes] = useState([]);
  const [newProgrammeCode, setNewProgrammeCode] = useState("");
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    University_Name: "",
    Title: "",
    Description: "",
    City_ID: "",
    Caption: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // fetch the specific university details and cities
  useEffect(() => {
    axios.get(`http://localhost:3001/universities/${id}`).then(res => {
      const data = res.data;
      setForm({
        University_Name: data.University_Name || "",
        Title: data.Title || "",
        Description: data.Description || "",
        City_ID: data.City_ID || "",
        Caption: ""
      });
      setProgrammeCodes(data.Programmes || []);
      setImages(data.Images || []);
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

  const handleFileChange = (files) => {
    setSelectedFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("City_ID", form.City_ID);
    formData.append("University_Name", form.University_Name);
    formData.append("Title", form.Title);
    formData.append("Description", form.Description);
    if (selectedFile) {
      formData.append("Image", selectedFile);
      formData.append("Caption", form.Caption);
    }

    try {
      // send the updated data to the backend
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
        setSelectedFile(null);
        setImages(response.data.images || []);
      }
    } catch (err) {
      // handle error response for debugging
      console.error("Error updating university:", err);
      setMessage(err.response?.data?.message || "An error occurred.");
    }
  };

  // handle image deletion
  const handleDeleteImage = async (imageUrl) => {
    const confirm = window.confirm("Are you sure you want to delete this image?");
    if (!confirm) return;

    try {
      // send the delete request to the backend
      const res = await axios.delete(`http://localhost:3001/universities/edit/${id}/images`, {
        data: { imageUrl },
        headers: {
          Authorization: localStorage.getItem("adminToken")
        }
      });

      // render the updated images
      setImages(res.data.images);
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  // adding new programme code
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

      // render the updated programme codes
      setProgrammeCodes(res.data.codes);
      setNewProgrammeCode("");
    } catch (err) {
      console.error("Error adding programme code:", err);
      alert("Failed to add programme code.");
    }
  };

  // handle programme code deletion
  const handleDeleteUniProgrammeCode = async (codeToDelete) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete programme code "${codeToDelete}"?`);
    if (!confirmDelete) return;

    try {
      // send the delete request to the backend
      const res = await axios.delete(
        `http://localhost:3001/universities/edit/${id}/programmes/${codeToDelete}`,
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
        }
      );

      // render the updated programme codes
      setProgrammeCodes(res.data.codes);
    } catch (err) {
      console.error("Error deleting programme code:", err);
      alert("Failed to delete programme code.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative min-h-screen font-nunito">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat bg-fixed opacity-80 z-0"
        style={{ backgroundImage: `url(${UD_Background})` }}
      />

      <div className="relative z-10 px-6 md:px-10 pt-10 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl font-extrabold">Edit University</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white text-black rounded font-bold hover:bg-gray-200 transition"
          >
            ← Back
          </button>
        </div>
        <p className="text-white/90 mb-6">Make updates to this university’s profile and manage its gallery and programmes.</p>
        {message && <p className="text-green-400 font-bold mb-4">{message}</p>}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT SECTION */}
          <form onSubmit={handleSubmit} className="space-y-6 flex-1 max-w-2xl">
            <div>
              <label className="block text-lg font-bold mb-1">University Name</label>
              <input
                type="text"
                name="University_Name"
                value={form.University_Name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-white/80 text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-1">Title</label>
              <input
                type="text"
                name="Title"
                value={form.Title}
                onChange={handleChange}
                className="w-full p-3 rounded bg-white/80 text-black"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-1">City</label>
              <select
                name="City_ID"
                value={form.City_ID}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-white/80 text-black"
              >
                <option value="">Select a city</option>
                {cities.map(city => (
                  <option key={city.City_ID} value={city.City_ID}>
                    {city.City_Name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-bold mb-1">Description</label>
              <textarea
                name="Description"
                value={form.Description}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 rounded bg-white/80 text-black"
              />
            </div>

            <button type="submit" className="mt-4 px-6 py-2 bg-green-700 hover:bg-green-800 rounded text-white font-bold">
              Update University
            </button>
          </form>

          {/* RIGHT SECTION - File Upload */}
          <div className="flex-1">
            <label className="block text-lg font-bold mb-1">Upload New Image</label>
            <FileUpload onChange={handleFileChange} />
            <input
              type="text"
              name="Caption"
              value={form.Caption}
              onChange={handleChange}
              placeholder="Enter caption"
              className="mt-2 w-full p-2 rounded bg-white/80 text-black"
            />
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Current Gallery</h2>
          <div className="flex flex-wrap gap-6 justify-start">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <CardContainer containerClassName="!py-4">
                  <CardBody className="!w-80 !h-60">
                    <CardItem
                      translateZ={20}
                      rotateX={1}
                      rotateY={-2}
                      className="rounded-2xl overflow-hidden shadow-lg"
                    >
                      <img
                        src={`http://localhost:3001${img.Image_URL}`}
                        alt={img.Caption || 'University Image'}
                        className="w-full h-full object-cover"
                      />
                    </CardItem>
                    <CardItem
                      translateZ={30}
                      className="text-center mt-2 text-white font-medium"
                    >
                      {img.Caption}
                    </CardItem>
                  </CardBody>
                </CardContainer>
                <button
                  onClick={() => handleDeleteImage(img.Image_URL)}
                  className="absolute top-1 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Programme Codes */}
        <div className="mt-16 max-w-3xl pb-32">
          <h2 className="text-3xl font-bold mb-4 text-white">Programme Codes</h2>
          <form onSubmit={handleAddProgrammeCode} className="flex items-center gap-4 mb-6">
            <input
              type="text"
              value={newProgrammeCode}
              onChange={(e) => setNewProgrammeCode(e.target.value)}
              placeholder="Enter new programme code"
              className="flex-1 p-3 rounded bg-white/80 text-black"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-800 text-white font-semibold rounded hover:scale-105 transition"
            >
              Add
            </button>
          </form>

          {programmeCodes.length > 0 ? (
            <ul className="space-y-2">
              {programmeCodes.map((code, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white/80 text-black px-4 py-2 rounded shadow"
                >
                  <span className="font-medium">{code}</span>
                  <button
                    onClick={() => handleDeleteUniProgrammeCode(code)}
                    className="text-red-600 hover:text-red-800 text-sm font-bold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/80 italic">No programme codes added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateUniversityDetails;
