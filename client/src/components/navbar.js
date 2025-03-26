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
                        <a href="/admin/dashboard">Create</a>
                    </li>
                )}
                {(!isStudentLoggedIn && !isAdminLoggedIn) && (
                    <li>
                        <button onClick={() => navigate('/Universities')}>Universities</button>
                    </li>
                )}
                <li>
                    <a href="/CommunityTC">EasyExchange+</a>
                </li>
            </ul>
        </nav>
    );
}