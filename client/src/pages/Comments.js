import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch existing comments
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

    // Handle adding a new comment
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prevent empty comments from being submitted
        if (!newComment.trim()) {
            return;
        }

        const payload = {
            comment: newComment, // send the comment data
        };

        axios.post('http://localhost:3001/Comments', payload)
            .then(response => {
                console.log(response.data);
                // Append the new comment to the list
                setComments([...comments, {
                    Comment_ID: response.data.commentId,
                    Comment: newComment
                }]);
                setNewComment(''); // Clear input after submitting
            })
            .catch(error => {
                console.error('Error posting comment:', error);
            });
    };

    return (
        <div>
            <h1>Comments</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.Comment_ID}>
                        Comment {comment.Comment_ID} - {comment.Comment}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;