import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import { patterns } from '../utils/validation';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Student_ID: '',
    Student_FirstName: '',
    Student_LastName: '',
    Student_Email: '',
    Student_Username: '',
    Student_DOB: '',
    Student_Password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // Function to determine the class for input fields based on validation
  const getInputClass = (name) => {
    if (!formData[name]) return '';
    return patterns[name]?.test(formData[name]) ? 'border-green-400' : 'border-orange-400';
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // send the inputted data payload to the backend
      const response = await axios.post('http://localhost:3001/auth/register', formData);
      if (response.status === 201) {
        setSuccessMessage('Registration successful!');
        navigate('/Login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const passwordChecks = [
    { label: 'At least one letter (A-Z or a-z)', valid: /[a-zA-Z]/.test(formData.Student_Password) },
    { label: 'At least one lowercase letter', valid: /[a-z]/.test(formData.Student_Password) },
    { label: 'At least three digits', valid: /(.*\d.*){3,}/.test(formData.Student_Password) },
    { label: 'At least one special character (!@#$%^&* etc.)', valid: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.Student_Password) },
    { label: '8 to 20 characters in length', valid: /^.{8,20}$/.test(formData.Student_Password) },
  ];

  return (
    <div className="h-screen relative bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-gray-200"
        style={{
          clipPath: 'polygon(0 80%, 100% 60%, 100% 100%, 0% 100%)',
        }}
      ></div>

      <div className="flex flex-row w-full h-full">
        {/* LEFT SIDE */}
        <div className="w-3/5 text-white px-16 py-4 flex flex-col justify-start relative z-20" style={{ fontFamily: 'Nunito, sans-serif' }}>
          <div>
            <h1 className="text-5xl font-bold mb-6">Welcome to EasyExchangeConnect</h1>
            <p className="mb-6 text-xl leading-relaxed">
              EasyExchange is your one-stop platform for managing university exchange applications. 
              Whether you're applying for an exchange program or tracking your application status, 
              we've got you covered. Join thousands of students who have simplified their exchange journey.
            </p>

            <ul className="space-y-5 text-lg">
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Hassle-Free Applications:</strong> Submit your exchange applications with ease 
                  and avoid unnecessary paperwork.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Upload Documents:</strong> Upload your GPA documents, transcripts, and other 
                  required files directly to the platform.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Track Your Status:</strong> Stay updated on the progress of your application 
                  with real-time notifications.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>University Connections:</strong> Connect with universities worldwide and explore 
                  exchange opportunities tailored to your academic goals.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Secure and Reliable:</strong> Your data is safe with us. We prioritize security 
                  and ensure a seamless experience.
                </span>
              </li>
            </ul>

            <p className="mt-6 text-xl leading-relaxed">
              Ready to start your exchange journey? Register now and take the first step toward an 
              exciting academic adventure!
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex justify-center items-center relative z-10">
          <div className="bg-white shadow-xl rounded-xl p-6 mx-4 max-w-fit border-2 border-black">
            <h2 className="text-xl font-bold text-center mb-3">Student Registration</h2>

            {error && <p className="text-red-500 text-center font-bold mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 text-center font-bold mb-2">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  name="Student_ID"
                  placeholder="Student ID"
                  value={formData.Student_ID}
                  onChange={handleChange}
                  required
                  className={`input-style ${getInputClass('Student_ID')}`}
                />
                <p className={`text-sm font-bold text-center text-orange-500 transition-all duration-300 ${getInputClass('Student_ID') === 'border-orange-400' ? 'opacity-100 h-auto mt-1' : 'opacity-0 h-0'}`}>
                  This must be your TU Dublin student ID (e.g. C20426814)
                </p>
              </div>

              <div>
                <input
                  type="email"
                  name="Student_Email"
                  placeholder="Email Address"
                  value={formData.Student_Email}
                  onChange={handleChange}
                  required
                  className={`input-style ${getInputClass('Student_Email')}`}
                />
                <p className={`text-sm font-bold text-center text-orange-500 transition-all duration-300 ${getInputClass('Student_Email') === 'border-orange-400' ? 'opacity-100 h-auto mt-1' : 'opacity-0 h-0'}`}>
                  Must be a valid TU Dublin email (e.g. c20426814@mytudublin.ie)
                </p>
              </div>

              <div>
                <input
                  type="text"
                  name="Student_Username"
                  placeholder="Username"
                  value={formData.Student_Username}
                  onChange={handleChange}
                  required
                  className={`input-style ${getInputClass('Student_Username')}`}
                />
                <p className={`text-sm font-bold text-center text-orange-500 transition-all duration-300 ${getInputClass('Student_Username') === 'border-orange-400' ? 'opacity-100 h-auto mt-1' : 'opacity-0 h-0'}`}>
                  Must be lowercase and 5–15 characters
                </p>
              </div>

              <input
                type="text"
                name="Student_FirstName"
                placeholder="First Name"
                value={formData.Student_FirstName}
                onChange={handleChange}
                required
                className={`input-style ${getInputClass('Student_FirstName')}`}
              />
              <input
                type="text"
                name="Student_LastName"
                placeholder="Last Name"
                value={formData.Student_LastName}
                onChange={handleChange}
                required
                className={`input-style ${getInputClass('Student_LastName')}`}
              />
              <input
                type="date"
                name="Student_DOB"
                placeholder="Date of Birth"
                value={formData.Student_DOB}
                onChange={handleChange}
                required
                className={`input-style`}
              />
              <input
                type="password"
                name="Student_Password"
                placeholder="Password"
                value={formData.Student_Password}
                onChange={handleChange}
                required
                className={`input-style ${getInputClass('Student_Password')}`}
              />

              <div className="bg-gray-100 rounded-lg p-3 text-sm text-left">
                <p className="font-bold mb-2">Password must include:</p>
                <ul className="list-disc ml-4 space-y-1">
                  {passwordChecks.map((check, index) => (
                    <li key={index} className={check.valid ? "text-green-600" : "text-red-500"}>
                      {check.valid ? '✅ ' : '⬜ '}{check.label}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow hover:scale-105 transition"
              >
                Register
              </button>
            </form>

            <div className="flex justify-between mt-4 text-sm">
              <button onClick={() => navigate('/Login')} className="text-blue-600 hover:underline">Go to Login</button>
              <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Back to Homepage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;