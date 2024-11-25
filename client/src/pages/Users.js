import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

function Users() {
    const [users, setUsers] = useState([]); // State to hold user data

    useEffect(() => {
        axios.get('http://localhost:3001/Users') // Fetch from backend
            .then(response => {
                console.log('Fetched users:', response.data); // Log the fetched data
                setUsers(response.data); // Update state with fetched data
            })
            .catch(error => {
                console.error('Error fetching data from React Side:', error);
            });
    }, []); // Dependency array ensures this runs once after component mounts

    return (
        <div>
            <Navbar />
            <h1>Users List</h1>
            <ul>
                {users.map((user) => (
                    <li key={users.student_id}> {/* Use index as a fallback key */}
                        {user.Student_Username} - {user.Student_Email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
