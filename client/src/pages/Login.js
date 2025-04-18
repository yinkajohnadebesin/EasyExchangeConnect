import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';

import githubLogo from '../assets/socials/GitHub.png';
import linkedinLogo from '../assets/socials/LinkedIn.png';
import instagramLogo from '../assets/socials/Instagram.png';
import youtubeLogo from '../assets/socials/Youtube.png';


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Student_Email: '',
    Student_Password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // send the inputted data payload to the backend
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('studentUsername', response.data.user.Student_Username);
        localStorage.setItem('studentId', response.data.user.Student_ID);
        navigate('/welcome');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const socialIcons = [
    {
      id: 1,
      name: "GitHub",
      designation: "My Projects",
      image: githubLogo,
      link: "https://github.com/yinkajohnadebesin/EasyExchangeConnect",
    },
    {
      id: 2,
      name: "LinkedIn",
      designation: "Connect with me",
      image: linkedinLogo,
      link: "https://www.linkedin.com/in/yinka-adebesin/",
    },
    {
      id: 3,
      name: "Instagram",
      designation: "@yinkaadebesin",
      image: instagramLogo,
      link: "https://www.instagram.com/yinkaadebesin/",
    },
    {
      id: 4,
      name: "YouTube",
      designation: "See my videos",
      image: youtubeLogo,
      link: "https://www.youtube.com/watch?v=sfPA5MnEPvg",
    },
  ];

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("http://localhost:3001/uploads/clouds.jpg")`,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div className="flex w-full h-full">
        {/* LEFT SIDE */}
        <div className="w-1/2 text-white p-12 flex flex-col justify-center items-start">
          <h1 className="text-6xl font-extrabold mb-6">Welcome Back</h1>
          <p className="max-w-lg text-lg mb-8 leading-relaxed">
            Start where you left off — sign in to access your personalized dashboard,
            track your application progress, and stay connected with your exchange journey.
          </p>
          <div className="flex space-x-6 mt-4">
            <AnimatedTooltip items={socialIcons} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex flex-col justify-center items-center text-white px-10">
          <div className="bg-white bg-opacity-90 text-black rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>

            {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="Student_Email"
                  value={formData.Student_Email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded border border-gray-400 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="Student_Password"
                  value={formData.Student_Password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded border border-gray-400 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="h-4 w-4" />
                <label htmlFor="remember" className="text-sm">Remember Me</label>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
              >
                Sign in now
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              <p className="text-blue-600 hover:underline cursor-pointer">Lost your password?</p>
              <p className="mt-2 text-gray-600">
                By clicking on "Sign in now" you agree to our{' '}
                <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>

            <div className="mt-6 flex justify-between text-sm">
              <button onClick={() => navigate('/Register')} className="text-blue-600 hover:underline">
                Sign up as a Student
              </button>
              <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
