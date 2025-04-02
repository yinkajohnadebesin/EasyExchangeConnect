import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [replies, setReplies] = useState({});
    const [expandedComments, setExpandedComments] = useState([]); 
    const [replyInputs, setReplyInputs] = useState({});

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    const isLoggedIn = !!(localStorage.getItem("token") || localStorage.getItem("adminToken"));
    const studentUsername = localStorage.getItem("studentUsername");
    const adminUsername = localStorage.getItem("adminUsername");

    console.log("studentUsername:", studentUsername);
    console.log("adminUsername:", adminUsername);

    // Fetch comments
    useEffect(() => {
        axios.get('http://localhost:3001/comments')
            .then(res => {
                console.log("Fetched comments:", res.data);
                setComments(res.data);
            })
            .catch(err => console.error("Error fetching comments:", err));
    }, []);

    // Toggle replies to make the visible or hidden
    const toggleReplies = async (commentId) => {
        const isOpen = expandedComments.includes(commentId);
        if (!isOpen) {
            if (!replies[commentId]) {
                const res = await axios.get(`http://localhost:3001/comments/${commentId}/replies`);
                setReplies(prev => ({ ...prev, [commentId]: res.data }));
            }
            setExpandedComments([...expandedComments, commentId]);
        } else {
            setExpandedComments(expandedComments.filter(id => id !== commentId));
        }
    };

    // Add comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
    
        try {
            const res = await axios.post('http://localhost:3001/comments', { comment: newComment }, {
                headers: { Authorization: localStorage.getItem("token") || localStorage.getItem("adminToken") }
            });
    
            const newCommentObj = {
                Comment_ID: res.data.commentId,
                Comment: newComment,
                Comment_Creator_s: res.data.studentUsername || null,
                Comment_Creator_l: res.data.lecturerUsername || null,
                Comment_DateCreated: new Date().toISOString()
            };
    
            setComments([...comments, newCommentObj]);
            setNewComment('');
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };
    
    // Add reply
    const handleAddReply = async (commentId) => {
        const replyText = replyInputs[commentId];
        if (!replyText.trim()) return;
    
        try {
            const payload = { reply: replyText, commentId };
    
            const response = await axios.post(
                "http://localhost:3001/comments/replies",
                payload,
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || localStorage.getItem("adminToken")
                    }
                }
            );
    
            const newReply = {
                Reply_ID: response.data.replyId,
                Reply: replyText,
                Reply_Creator_s: response.data.studentUsername || null,
                Reply_Creator_l: response.data.lecturerUsername || null,
                Reply_DateCreated: new Date().toISOString()
            };
    
            setReplies(prev => ({
                ...prev,
                [commentId]: [...(prev[commentId] || []), newReply]
            }));
    
            setReplyInputs(prev => ({
                ...prev,
                [commentId]: ''
            }));
    
        } catch (err) {
            console.error("Error posting reply:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment and its replies?");
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:3001/comments/${commentId}`, {
                headers: {
                    Authorization: localStorage.getItem("token") || localStorage.getItem("adminToken")
                }
            });
    
            // Remove comment from visibility
            setComments(prev => prev.filter(comment => comment.Comment_ID !== commentId));
            setReplies(prev => {
                const newReplies = { ...prev };
                delete newReplies[commentId];
                return newReplies;
            });
    
        } catch (err) {
            console.error("Failed to delete comment:", err);
            alert("You can only delete comments you've made.");
        }
    };

    const handleEditComment = async (commentId) => {
        if (!editCommentText.trim()) return;
    
        try {
            await axios.patch(`http://localhost:3001/comments/${commentId}`, 
                { newComment: editCommentText },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || localStorage.getItem("adminToken")
                    }
                }
            );
    
            // Update the comment in state
            setComments(prev =>
                prev.map(comment =>
                    comment.Comment_ID === commentId
                        ? { ...comment, Comment: editCommentText }
                        : comment
                )
            );
    
            setEditingCommentId(null);
            setEditCommentText('');
        } catch (err) {
            console.error("Failed to edit comment:", err);
            alert("You can only edit comments you've made.");
        }
    };    

    return (
        <div>
            <h2>Community Comments</h2>
    
            {isLoggedIn && (
                <form onSubmit={handleAddComment}>
                    <textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <br />
                    <button type="submit">Submit Comment</button>
                </form>
            )}
    
            <ul>
                {comments.map(comment => (
                    <li key={comment.Comment_ID} style={{ marginBottom: '1.5rem' }}>
                        <div>
                            <strong>
                                {comment.Comment_Creator_s || comment.Comment_Creator_l || "Unknown"}
                            </strong>{" "}
                            <small style={{ float: 'right' }}>
                                {new Date(comment.Comment_DateCreated).toLocaleString()}
                            </small>
    
                            {editingCommentId === comment.Comment_ID ? (
                                <div>
                                    <textarea
                                        value={editCommentText}
                                        onChange={(e) => setEditCommentText(e.target.value)}
                                    />
                                    <br />
                                    <button onClick={() => handleEditComment(comment.Comment_ID)}>Save</button>
                                    <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <p>{comment.Comment}</p>
                            )}
                        </div>
    
                        <button onClick={() => toggleReplies(comment.Comment_ID)}>
                            {expandedComments.includes(comment.Comment_ID) ? "Hide Replies" : "View Replies"}
                        </button>
    
                        {((comment.Comment_Creator_s && comment.Comment_Creator_s === studentUsername) ||
                          (comment.Comment_Creator_l && comment.Comment_Creator_l === adminUsername)) && (
                            <>
                                <button
                                    onClick={() => {
                                        setEditingCommentId(comment.Comment_ID);
                                        setEditCommentText(comment.Comment);
                                    }}
                                    style={{ marginLeft: '1rem' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteComment(comment.Comment_ID)}
                                    style={{ marginLeft: '1rem', color: 'red' }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
    
                        {expandedComments.includes(comment.Comment_ID) && (
                            <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                                <ul>
                                    {(replies[comment.Comment_ID] || []).map(reply => (
                                        <li key={reply.Reply_ID} style={{ marginBottom: "1rem" }}>
                                            <small>
                                                <strong>
                                                    {reply.Reply_Creator_s || reply.Reply_Creator_l || "Unknown"}
                                                </strong>
                                            </small>{" "}
                                            <small style={{ float: 'right' }}>
                                                {new Date(reply.Reply_DateCreated).toLocaleString()}
                                            </small>
                                            <p>{reply.Reply}</p>
                                        </li>
                                    ))}
                                </ul>
    
                                {isLoggedIn && (
                                    <div>
                                        <textarea
                                            placeholder="Write a reply..."
                                            value={replyInputs[comment.Comment_ID] || ''}
                                            onChange={(e) =>
                                                setReplyInputs(prev => ({
                                                    ...prev,
                                                    [comment.Comment_ID]: e.target.value
                                                }))
                                            }
                                        />
                                        <br />
                                        <button onClick={() => handleAddReply(comment.Comment_ID)}>
                                            Add Reply
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );    
}

export default Comments;