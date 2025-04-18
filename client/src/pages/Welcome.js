import arcsData from "../data/arcs-data.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { World } from "../components/ui/globe";

function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch user profile data from the backend
        const response = await axios.get("http://localhost:3001/user/profile", {
          headers: { Authorization: token },
        });
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const globeConfig = {
    globeColor: "#1d072e",
    emissive: "#0f4c81",
    emissiveIntensity: 0.5,
    shininess: 0.9,
    polygonColor: "rgb(255, 255, 255)",
    showAtmosphere: true,
    atmosphereColor: "#91e0ff",
    atmosphereAltitude: 0.2,
    arcTime: 1000,
    arcLength: 0.8,
    rings: 1,
    maxRings: 5,
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black via-grey to-cyan-900 text-white overflow-hidden">
      {/* Welcome Panel */}
      <div className="relative z-10 flex flex-col justify-center items-start px-8 sm:px-10 py-24 max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow-[0_2px_12px_rgba(91,145,255,0.6)]">
          {user ? `Welcome, ${user.Student_FirstName}! So nice to see you!` : "Loading..."}
        </h1>
        <p className="text-lg text-neutral-200 mb-8 leading-relaxed">
          Welcome to your exchange homepage dashboard. Track your applications, explore top universities Technological University of Dublin are partnered with, and start your Erasmus journey.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/my-applications")}
            className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 shadow-md hover:scale-105 transition"
          >
            View My Applications
          </button>

          <button
            onClick={() => navigate("/universities")}
            className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-800 shadow-md hover:scale-105 transition"
          >
            Explore Universities
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Floating Globe */}
      <div className="absolute inset-0 flex justify-end items-center pointer-events-none z-0">
        <div className="w-full h-full md:w-[50%]">
          <World globeConfig={globeConfig} data={arcsData} />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
