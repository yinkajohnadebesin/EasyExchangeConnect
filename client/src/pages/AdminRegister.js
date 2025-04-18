import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import { patterns_L } from '../utils/validation';

function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Lecturer_ID: '',
    Lecturer_FirstName: '',
    Lecturer_LastName: '',
    Lecturer_Email: '',
    Lecturer_Username: '',
    Lecturer_DOB: '',
    Lecturer_Password: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Function to get the class name based on validation
  const getInputClass = (name) => {
    if (!formData[name]) return '';
    return patterns_L[name]?.test(formData[name]) ? 'border-green-400' : 'border-orange-400';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Send a POST request to the server with the form data payload
      const response = await axios.post('http://localhost:3001/admin/register', formData);
      if (response.status === 201) {
        // Successful registration
        setSuccessMessage('Registration successful!');
        navigate('/admin-login');
      }
    } catch (err) {
      // Handle error response from the server
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const passwordChecks = [
    {
      label: 'At least one letter (A-Z or a-z)',
      valid: /[a-zA-Z]/.test(formData.Lecturer_Password),
    },
    {
      label: 'At least one lowercase letter',
      valid: /[a-z]/.test(formData.Lecturer_Password),
    },
    {
      label: 'At least three digits',
      valid: /(.*\d.*){3,}/.test(formData.Lecturer_Password),
    },
    {
      label: 'At least one special character (!@#$%^&* etc.)',
      valid: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.Lecturer_Password),
    },
    {
      label: '8 to 20 characters in length',
      valid: /^.{8,20}$/.test(formData.Lecturer_Password),
    },
  ];

  return (
    <div className="h-screen relative bg-gradient-to-br from-green-400 to-green-800 overflow-hidden">
      {/* Slanted Background Divider */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-gray-200"
        style={{
          clipPath: 'polygon(0 60%, 100% 80%, 100% 100%, 0% 100%)',
        }}
      ></div>

      <div className="flex flex-row w-full h-full relative z-10">
        {/* LEFT SIDE: FORM */}
        <div className="flex justify-center items-center w-1/2">
          <div className="bg-white shadow-xl rounded-xl p-6 mx-0 max-w-fit border-2 border-black w-[500px]">
            <h2 className="text-xl font-bold text-center mb-3">Admin Registration</h2>
            

            {error && <p className="text-red-500 text-center font-bold mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 text-center font-bold mb-2">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  name="Lecturer_ID"
                  placeholder="Lecturer ID"
                  value={formData.Lecturer_ID}
                  onChange={handleChange}
                  required
                  className={`input-style ${getInputClass('Lecturer_ID')}`}
                />
                <p className={`text-sm font-bold text-center text-orange-500 mt-1 transition-all duration-200 ${getInputClass('Lecturer_ID') === 'border-orange-400' ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                  Must start with 'L' followed by 8 digits (e.g. L12345678)
                </p>
              </div>

              <input
                type="text"
                name="Lecturer_FirstName"
                placeholder="First Name"
                value={formData.Lecturer_FirstName}
                onChange={handleChange}
                required
                className={`input-style ${getInputClass('Lecturer_FirstName')}`}
              />

              <input
                type="text"
                name="Lecturer_LastName"
                placeholder="Last Name"
                value={formData.Lecturer_LastName}
                onChange={handleChange}
                required
                className={`input-style ${getInputClass('Lecturer_LastName')}`}
              />

              <div>
                <input
                  type="email"
                  name="Lecturer_Email"
                  placeholder="Email"
                  value={formData.Lecturer_Email}
                  onChange={handleChange}
                  required
                  className={`input-style ${getInputClass('Lecturer_Email')}`}
                />
                <p className={`text-sm font-bold text-center text-orange-500 mt-1 transition-all duration-200 ${getInputClass('Lecturer_Email') === 'border-orange-400' ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                  Must be a valid TU Dublin email (e.g. firstname.lastname@tudublin.ie)
                </p>
              </div>

              <div>
                <input
                  type="text"
                  name="Lecturer_Username"
                  placeholder="Username"
                  value={formData.Lecturer_Username}
                  onChange={handleChange}
                  required
                  className={`input-style ${getInputClass('Lecturer_Username')}`}
                />
                <p className={`text-sm font-bold text-center text-orange-500 mt-1 transition-all duration-200 ${getInputClass('Lecturer_Username') === 'border-orange-400' ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                  Must be lowercase and 5–15 characters
                </p>
              </div>

              <input
                type="date"
                name="Lecturer_DOB"
                placeholder="Date of Birth"
                value={formData.Lecturer_DOB}
                onChange={handleChange}
                required
                className="input-style"
              />

              <input
                type="password"
                name="Lecturer_Password"
                placeholder="Password"
                value={formData.Lecturer_Password}
                onChange={handleChange}
                required
                className={`input-style ${getInputClass('Lecturer_Password')}`}
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
                className="w-full py-2 text-white rounded-full shadow hover:scale-105 transition"
                style={{
                  background: 'linear-gradient(to bottom right, #32CD32, #006400)',
                }}
              >
                Register as a TUD Lecturer
              </button>
            </form>

            <div className="flex justify-center mt-4 text-sm">
              <button onClick={() => navigate('/admin-login')} className="text-blue-600 hover:underline">Go to Login</button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: INFO */}
        <div className="w-3/5 text-white px-8 py-8 flex flex-col justify-start items-start h-full" style={{ fontFamily: 'Nunito, sans-serif' }}>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 text-center">EasyExchangeConnect - Admin</h1>
            <p className="mb-6 text-xl leading-relaxed text-center">
              As a TU Dublin lecturer, you play a vital role in managing and overseeing the exchange application process. 
              This platform empowers you to efficiently handle student submissions, approve or reject applications, and 
              ensure a smooth and transparent process for all participants.
            </p>

            <ul className="space-y-5 text-lg">
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>View and Manage Applications:</strong> Access all submitted student applications in one place, 
                  with detailed information for each submission.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Approve or Reject Submissions:</strong> Make informed decisions on applications and provide 
                  feedback to students where necessary.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Automated Notifications:</strong> Notify students of updates to their application status 
                  automatically via email.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Track University Submissions:</strong> Oversee and manage university entries to ensure 
                  compliance with exchange program requirements.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaGraduationCap className="text-white text-3xl" />
                <span>
                  <strong>Streamlined Workflow:</strong> Save time and reduce paperwork with a centralized, 
                  user-friendly platform designed for efficiency.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
