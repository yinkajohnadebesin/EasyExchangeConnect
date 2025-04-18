import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [filters, setFilters] = useState({
    university: "",
    status: "",
    date: "",
    sort: "desc",
  });

  // 
  useEffect(() => {
    // Check if the token exists, if not redirect to login page
    if (!token) {
      navigate("/AdminLogin");
      return;
    }

    // Fetch all applications
    const fetchAllApplications = async () => {
      try {
        const res = await axios.get("http://localhost:3001/applications", {
          headers: {
            Authorization: token,
          },
        });
        setApplications(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setLoading(false);
      }
    };

    // Fetch all universities
    const fetchUniversities = async () => {
      try {
        const res = await axios.get("http://localhost:3001/universities");
        setUniversities(res.data);
      } catch (err) {
        console.error("Failed to fetch universities:", err);
      }
    };

    fetchAllApplications();
    fetchUniversities();
  }, [token, navigate]);

  // Filter and sort applications based on filters
  useEffect(() => {
    const filtered = applications.filter((app) => {
      // filter on university, status, and date
      const matchesUniversity = !filters.university || app.Institution_Choice === filters.university;
      const matchesStatus = !filters.status || app.Status === filters.status;
      const matchesDate = !filters.date || new Date(app.Application_Submit_Date) <= new Date(filters.date);
      return matchesUniversity && matchesStatus && matchesDate;
    });

    // sort applications based on date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.Application_Submit_Date);
      const dateB = new Date(b.Application_Submit_Date);
      return filters.sort === "asc" ? dateA - dateB : dateB - dateA;
    });

    // render changes
    setFilteredApplications(sorted);
  }, [applications, filters]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        // Update the status of the application in the backend
        `http://localhost:3001/applications/status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // render changes in the frontend
      setApplications((prev) =>
        prev.map((app) =>
          app.Application_ID === id ? { ...app, Status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // 'ESCAPE' key event listener to close zoomed in image
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalImage(null);
      }
    };

    if (modalImage) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalImage]);

  if (loading) return <p className="text-center mt-10">Loading all applications...</p>;

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        universities={universities}
      />

      <div className="max-w-6xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold mb-6">All Student Applications</h2>

        {filteredApplications.length === 0 ? (
          <p>No applications found for selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((app) => (
              <div
                key={app.Application_ID}
                className="border rounded-xl shadow-md p-6 bg-white"
              >
                <p><strong>Name:</strong> {app.First_Name} {app.Last_Name}</p>
                <p><strong>Email:</strong> {app.Email}</p>
                <p><strong>Student Number:</strong> {app.Student_Number}</p>
                <p><strong>GPA:</strong> {app.GPA}</p>
                <p><strong>University:</strong> {app.Institution_Choice}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-semibold ${app.Status === "Approved"
                    ? "text-green-600"
                    : app.Status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                    }`}>
                    {app.Status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Submitted on {new Date(app.Application_Submit_Date).toLocaleDateString("en-GB")},{" "}
                  {new Date(app.Application_Submit_Date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>

                {app.GPA_Image_URL && (
                  <div className="mt-2">
                    <img
                      src={`http://localhost:3001/${app.GPA_Image_URL}`}
                      alt="GPA Proof"
                      onClick={() => setModalImage(`http://localhost:3001/${app.GPA_Image_URL}`)}
                      className="h-32 object-contain rounded cursor-pointer hover:scale-105 transition"
                    />
                  </div>
                )}

                {app.Status === "Pending" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => updateStatus(app.Application_ID, "Approved")}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app.Application_ID, "Rejected")}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={modalImage}
            alt="Full GPA"
            className="max-w-3xl max-h-[80vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default ViewApplications;
