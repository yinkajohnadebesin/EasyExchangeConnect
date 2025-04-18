import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import background from "../assets/statics/applicationsBackground.jpg";

const GetApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!studentId || !token) {
      navigate("/Login");
      return;
    }

    // Fetch applications for the logged-in student
    const fetchStudentApplications = async () => {
      try {
        const res = await axios.get("http://localhost:3001/applications/my-applications", {
          headers: {
            Authorization: token,
          },
        });
        // render the data
        setApplications(res.data);
        setLoading(false);
      } catch (err) {
        // handle error
        console.error("Failed to fetch applications:", err);
        setLoading(false);
      }
    };

    fetchStudentApplications();
  }, [studentId, token, navigate]);

  // Card carousel Logic
  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % applications.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? applications.length - 1 : prev - 1
    );
  };

  const openImage = (url) => {
    window.open(`http://localhost:3001/${url}`, "_blank");
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-16 px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h2 className="text-4xl font-bold text-left mb-12 text-white font-nunito">
        Your Submitted Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-white">No applications submitted yet.</p>
      ) : (
        <div className="relative w-full flex justify-center items-center">
          {/* Arrows */}
          <button
            onClick={prev}
            className="z-20 p-2 rounded-full bg-white shadow hover:scale-105 transition mx-4"
            aria-label="Previous"
          >
            <IconArrowNarrowRight className="rotate-180 text-black" />
          </button>

          {/* Card Carousel Stack */}
          <div className="relative w-full max-w-md h-[500px]">
            {applications.map((app, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={app.Application_ID}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 transform
                    ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"}`}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 text-black h-full flex flex-col justify-between">
                    <div>
                      <p><strong>Name:</strong> {app.First_Name} {app.Last_Name}</p>
                      <p><strong>Email:</strong> {app.Email}</p>
                      <p><strong>Student Number:</strong> {app.Student_Number}</p>
                      <p><strong>GPA:</strong> {app.GPA}</p>
                      <p><strong>University:</strong> {app.University_Name}</p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`font-bold ${
                            app.Status === "Approved"
                              ? "text-green-600"
                              : app.Status === "Rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {app.Status}
                        </span>
                      </p>
                      <p className="text-sm mt-2 text-gray-500">
                        Submitted on{" "}
                        {new Date(app.Application_Submit_Date).toLocaleString()}
                      </p>
                    </div>

                    {app.GPA_Image_URL && (
                      <div className="mt-4">
                        <img
                          src={`http://localhost:3001/${app.GPA_Image_URL}`}
                          alt="GPA Proof"
                          className="h-32 object-contain rounded cursor-pointer"
                          onClick={() => openImage(app.GPA_Image_URL)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={next}
            className="z-20 p-2 rounded-full bg-white shadow hover:scale-105 transition mx-4"
            aria-label="Next"
          >
            <IconArrowNarrowRight className="text-black" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GetApplication;
