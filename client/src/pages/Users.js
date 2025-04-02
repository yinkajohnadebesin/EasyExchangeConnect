import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/Users')
            .then(response => {
                console.log('Fetched users:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from React Side:', error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Users List</h1>
            <ul>
                {users.map((user) => (
                    <li key={users.student_id}>
                        {user.Student_Username} - {user.Student_Email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
