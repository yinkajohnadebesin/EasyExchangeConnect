import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import haha from "../assets/statics/haha.png";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Lecturer_Email: "",
    Lecturer_Password: "",
  });
  const [error, setError] = useState("");

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Send a POST request to the server with the form data payload
      const response = await axios.post("http://localhost:3001/admin/login", formData);
      if (response.data.token) {
        // Store the token and username in local storage
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUsername", response.data.admin.Lecturer_Username);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      // Handle error response from the server
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex bg-black text-white overflow-hidden">
      {/* Left Side: Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 sm:px-10 md:px-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg p-10 rounded-xl w-full max-w-md space-y-6 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-white text-center">Admin Login</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="space-y-4">
            <input
              type="email"
              name="Lecturer_Email"
              placeholder="Email"
              value={formData.Lecturer_Email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              name="Lecturer_Password"
              placeholder="Password"
              value={formData.Lecturer_Password}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/20 text-white placeholder-white rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 hover:scale-105 transition-all duration-300"
          >
            Log In
          </button>

          <div className="flex justify-between text-sm text-white">
            <button type="button" onClick={() => navigate("/admin-register")} className="hover:underline">
              Sign up as a Lecturer
            </button>
            <button type="button" onClick={() => navigate("/")} className="hover:underline">
              Back to Home
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Full Height Image */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={haha}
          alt="Admin Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default AdminLogin;
