import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Boxes } from '../components/ui/background-boxes';

const Application = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentNumber: '',
    gpa: '',
    gpaImage: null,
    institutionChoice: '',
  });

  const [universities, setUniversities] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Check if user is logged in, if not redirect to login page
    if (!studentId || !token) {
      navigate('/Login');
      return;
    }

    // Fetch profile and universities
    const fetchProfileAndUniversities = async () => {
      try {
        const [profileRes, universitiesRes] = await Promise.all([
          // fetch profile
          axios.get("http://localhost:3001/user/profile", {
            headers: { Authorization: token },
          }),
          // fetch universities
          axios.get("http://localhost:3001/universities")
        ]);

        const profile = profileRes.data;

        // popuplate form data with user's profile information
        setFormData((prev) => ({
          ...prev,
          firstName: profile.Student_FirstName || '',
          lastName: profile.Student_LastName || '',
          email: profile.Student_Email || '',
          studentNumber: profile.Student_ID || '',
        }));

        setUniversities(universitiesRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile/universities", err);
        setLoading(false);
      }
    };

    fetchProfileAndUniversities();
  }, [navigate, studentId, token]);

  // image upload handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gpaImage") {
      setFormData({ ...formData, gpaImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = new FormData();
    submission.append("Applicant_ID", studentId);
    submission.append("First_Name", formData.firstName);
    submission.append("Last_Name", formData.lastName);
    submission.append("Email", formData.email);
    submission.append("Student_Number", formData.studentNumber);
    submission.append("GPA", formData.gpa);
    submission.append("GPA_Image", formData.gpaImage);
    submission.append("Institution_Choice", formData.institutionChoice);

    try {
      // Post the application to the server...
      await axios.post("http://localhost:3001/applications", submission, {
        headers: {
          Authorization: token,
        },
      });

      // success message
      setMessage("Application submitted successfully!");
      navigate("/my-applications");
    } catch (err) {
      // error handling for debugging purposes...
      console.error("Error submitting application:", err);
      setMessage("Failed to submit application.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading form...</p>;

  return (
    <>
      {/* Main content with background boxes */}
      <div className="relative w-full min-h-screen font-nunito bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white overflow-hidden">
        <Boxes className="w-full h-[700px]" rows={90} cols={60} />
        <div className="z-10">
          <h1 className="text-6xl ml-10 mt-10 mr-10 font-extrabold">Exchange Application Form</h1>
          <h5 className="text-2xl ml-10 mt-10 mr-10">
            It's so nice to see considering a move aborad! 
            In this section, you will submit a basic appplication to the International coordinators at Technological University of Dublin to express your interest to the chosen institution.
            After submission, the lecturers will approve or deny your application based on your GPA and other factors by email,
            with an attatched document to be sent over to the partner university for you to fill out.
          </h5>
        </div>
          
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 pt-20 pb-10">
          <h2 className="text-3xl font-semibold mb-6 text-center">Upload and Select your Institution</h2>
          {message && <p className="mb-4 text-center text-blue-600">{message}</p>}
  
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              disabled
              className="w-full border p-2 rounded bg-gray-500 cursor-not-allowed opacity-50"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              disabled
              className="w-full border p-2 rounded bg-gray-500 cursor-not-allowed opacity-50"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              disabled
              className="w-full border p-2 rounded bg-gray-500 cursor-not-allowed opacity-50"
            />
            <input
              type="text"
              name="studentNumber"
              placeholder="Student Number"
              value={formData.studentNumber}
              disabled
              className="w-full border p-2 rounded bg-gray-500 cursor-not-allowed opacity-50"
            />
  
            <select
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded bg-gray-500 cursor-not-allowed"
            >
              <option value="">GPA (of Last Academic Year)</option>
              <option value="1:1">1:1</option>
              <option value="2:1">2:1</option>
              <option value="2:2">2:2</option>
              <option value="2:3">2:3</option>
              <option value="2:4">2:4</option>
            </select>
  
            <input
              type="file"
              name="gpaImage"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full"
            />
  
            <select
              name="institutionChoice"
              value={formData.institutionChoice}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded bg-gray-500 cursor-not-allowed"
            >
              <option value="">Select a University</option>
              {universities.map((uni) => (
                <option key={uni.University_ID} value={uni.University_ID}>
                  {uni.University_Name}
                </option>
              ))}
            </select>
  
            <button
              type="submit"
              className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow hover:shadow-md hover:scale-105 transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
  
      <div className="w-full h-48 bg-gray-900 pointer-events-none" />
    </>
  );
  
};

export default Application;
