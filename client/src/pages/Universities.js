import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HoverEffect } from "../components/ui/card-hover-effect";

const isAdminLoggedIn = localStorage.getItem("adminToken") !== null;

function Universities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Delete university function
  const handleDelete = async (universityId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this university from the list? This action cannot be reversed"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/universities/${universityId}`, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });

      alert("University deleted successfully");
      setUniversities((prev) =>
        prev.filter((u) => u.University_ID !== universityId)
      );
    } catch (err) {
      console.error("Failed to delete university", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete university");
    }
  };

  // Fetch universities from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/universities")
      .then((res) => {
        setUniversities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching universities:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-white text-center py-10">Loading universities...</p>;

  // Construct card props
  const items = universities.map((uni) => ({
    link: `/Universities/${uni.University_ID}`,
    title: uni.University_Name,
    description: `${uni.City_Name}, ${uni.Country_Name}`,
    id: uni.University_ID,
    image: uni.Image_URL ? `http://localhost:3001${uni.Image_URL}` : null,

  }));

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Technological University of Dublin-partnered Universities
      </h1>

      <HoverEffect
        items={items.map((item) => ({
          ...item,
          image: item.image,
          description: (
            <>
              {item.description}
              {isAdminLoggedIn && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}
                    className="text-white px-3 py-1 text-sm font-semibold bg-red-600 hover:bg-red-700 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/universities/edit/${item.id}`);
                    }}
                    className="text-white px-3 py-1 text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Edit
                  </button>
                </div>
              )}
            </>
          ),
        }))}
      />
    </div>
  );
}

export default Universities;