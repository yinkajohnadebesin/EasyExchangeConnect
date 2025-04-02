import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const isStudentLoggedIn = localStorage.getItem("token") !== null;
    const isAdminLoggedIn = localStorage.getItem("adminToken") !== null;

    const handleLogoClick = () => {
        if (isStudentLoggedIn) {
            navigate("/welcome");
        } else if (isAdminLoggedIn) {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
    };

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
        <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
            <button
                onClick={handleLogoClick}
                className="text-xl md:text-2xl font-bold text-blue-600 hover:text-purple-600 transition duration-300"
            >
                EasyExchangeConnect
            </button>

            <ul className="flex gap-4 items-center text-sm md:text-base font-medium text-gray-700">
                {isStudentLoggedIn && (
                    <>
                        <li>
                            <button
                                onClick={() => handleLogout('student')}
                                className="px-3 py-1 rounded hover:bg-blue-100 transition"
                            >
                                Logout
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/Application')}
                                className="px-3 py-1 rounded hover:bg-blue-100 transition"
                            >
                                Apply
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/Universities')}
                                className="px-3 py-1 rounded hover:bg-blue-100 transition"
                            >
                                Universities
                            </button>
                        </li>
                    </>
                )}

                {isAdminLoggedIn && (
                    <>
                        <li>
                            <button
                                onClick={() => handleLogout('admin')}
                                className="px-3 py-1 rounded hover:bg-purple-100 transition"
                            >
                                Logout
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/university/create')}
                                className="px-3 py-1 rounded hover:bg-purple-100 transition"
                            >
                                Create
                            </button>
                        </li>
                    </>
                )}

                {(!isStudentLoggedIn && !isAdminLoggedIn) && (
                    <li>
                        <button
                            onClick={() => navigate('/Universities')}
                            className="px-3 py-1 rounded hover:bg-gray-100 transition"
                        >
                            Universities
                        </button>
                    </li>
                )}

                <li>
                    <button
                        onClick={() => navigate('/CommunityTC')}
                        className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow hover:scale-105 transition"
                    >
                        EasyExchangeConnect+
                    </button>
                </li>
            </ul>
        </nav>
    );
}