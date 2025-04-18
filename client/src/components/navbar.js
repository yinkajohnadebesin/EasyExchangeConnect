import { useNavigate } from 'react-router-dom';
import { BackgroundGradient } from "../components/ui/background-gradient";

export default function Navbar() {
  const navigate = useNavigate();

  const isStudentLoggedIn = localStorage.getItem("token") !== null;
  const isAdminLoggedIn = localStorage.getItem("adminToken") !== null;

  // handle logo click to navigate to the appropriate page based on user type
  const handleLogoClick = () => {
    if (isStudentLoggedIn) {
      navigate("/welcome");
    } else if (isAdminLoggedIn) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  // logout function for both student and admin
  const handleLogout = (type) => {
    if (type === 'student') {
      localStorage.removeItem('token');
      localStorage.removeItem('studentUsername');
    } else {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUsername');
    }
    navigate('/');
  };

  return (
    <BackgroundGradient
      containerClassName="sticky top-0 z-50 rounded-b-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      className="px-6 py-4 backdrop-blur-md text-white"
    >
      <nav className="flex justify-between items-center">
        {/* Brand */}
        <button
          onClick={handleLogoClick}
          className="text-xl md:text-2xl font-bold hover:text-white transition duration-300 tracking-tight"
        >
          EasyExchangeConnect
        </button>

        {/* Nav Items */}
        <ul className="flex gap-4 items-center text-sm md:text-base font-medium">
          {isStudentLoggedIn && (
            <>
              <li>
                <button
                  onClick={() => navigate('/Universities')}
                  className="px-3 py-1 rounded hover:bg-white/20 transition"
                >
                  Universities
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/Application')}
                  className="px-3 py-1 rounded hover:bg-white/20 transition"
                >
                  Apply
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLogout('student')}
                  className="px-3 py-1 rounded hover:bg-red-400/20 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {isAdminLoggedIn && (
            <>
              <li>
                <button
                  onClick={() => navigate('/Universities')}
                  className="px-3 py-1 rounded hover:bg-white/20 transition"
                >
                  Universities
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/university/create')}
                  className="px-3 py-1 rounded hover:bg-purple-400/20 transition"
                >
                  Create
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin/applications')}
                  className="px-3 py-1 rounded hover:bg-purple-400/20 transition"
                >
                  Student Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLogout('admin')}
                  className="px-3 py-1 rounded hover:bg-red-400/20 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {!isStudentLoggedIn && !isAdminLoggedIn && (
            <>
              <li>
                <button
                  onClick={() => navigate('/Universities')}
                  className="px-3 py-1 rounded hover:bg-white/20 transition"
                >
                  Universities
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/Application')}
                  className="px-3 py-1 rounded hover:bg-white/20 transition"
                >
                  Apply
                </button>
              </li>
            </>
          )}

          {/* CTA Button */}
          <li>
            <button
              onClick={() => navigate('/CommunityTC')}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow hover:shadow-md hover:scale-105 transition"
            >
              EasyExchangeConnect+
            </button>
          </li>
        </ul>
      </nav>
    </BackgroundGradient>
  );
}
