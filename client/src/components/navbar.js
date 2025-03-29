import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const isStudentLoggedIn = localStorage.getItem("token") !== null;
    const isAdminLoggedIn = localStorage.getItem("adminToken") !== null;
    const navigate = useNavigate();

    return (
        <nav className="nav">
            <a href="/" className="site-title">EasyExchangeConnect</a>
            <ul>
                {isStudentLoggedIn && (
                    <li>
                        <a href="/Application">Apply</a>
                    </li>
                )}
                {isAdminLoggedIn && (
                    <li>
                        <button onClick={() => navigate('/university/create')}>Create</button>
                    </li>
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