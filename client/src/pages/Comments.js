import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from '../components/navbar';

function Comments() {
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/Comments') // fetch from backend
            .then(response => {
                console.log('Comments', response.data);
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from React Side:', error);
            });
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.Comment_ID}>
                        Comment {comment.Comment_ID} - {comment.Comment}
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default Comments;