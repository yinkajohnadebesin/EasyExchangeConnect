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

    return (
        <nav className="nav">
            <button onClick={handleLogoClick} className="site-title" style={{ background: "none", border: "none", cursor: "pointer" }}>
                EasyExchangeConnect
            </button>
            <ul>
                {isStudentLoggedIn && (
                    <ul>
                        <li>
                            <button onClick={() => { localStorage.removeItem('token'); 
                                navigate('/');
                                }}>Logout
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/Application')}>Apply</button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/Universities')}>Universities</button>
                        </li>
                    </ul>
                )}
                {isAdminLoggedIn && (
                    <ul>
                        <li>
                            <button onClick={() => { localStorage.removeItem('adminToken'); 
                                navigate('/');
                                }}>Logout
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate('/university/create')}>Create</button>
                        </li>
                        
                    </ul>
                )}
                {(!isStudentLoggedIn && !isAdminLoggedIn) && (
                    <li>
                        <button onClick={() => navigate('/Universities')}>Universities</button>
                    </li>
                )}
                <li>
                    <button onClick={() => navigate('/CommunityTC')}>EasyExchangeConnect+</button>
                </li>
            </ul>
        </nav>
    );
}