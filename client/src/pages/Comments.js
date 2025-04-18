import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContainerTextFlip } from "../components/ui/container-text-flip";

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

  // Fetch comments
  useEffect(() => {
    axios.get('http://localhost:3001/comments')
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.error("Error fetching comments:", err));
  }, []);

  // Toggle replies to make the visible or hidden
  const toggleReplies = async (commentId) => {
    const isOpen = expandedComments.includes(commentId);
    if (!isOpen) {
      if (!replies[commentId]) {
        // Fetch replies of specific comment
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
    // Check if the comment is empty
    if (!newComment.trim()) return;

    try {
      // Send the backend a payload with the new comment
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

      // Update the comments state with the new comment
      setComments([...comments, newCommentObj]);
      setNewComment('');
    } catch (err) {
      // Debugging error message
      console.error("Error posting comment:", err);
    }
  };

  // Add reply
  const handleAddReply = async (commentId) => {
    const replyText = replyInputs[commentId];
    // Check if the reply is empty
    if (!replyText.trim()) return;

    try {
      // Send the backend a payload with the new reply and the associated commentID
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

      // Update the replies state with the new reply
      setReplies(prev => ({
        ...prev,
        [commentId]: [...(prev[commentId] || []), newReply]
      }));

      setReplyInputs(prev => ({
        ...prev,
        [commentId]: ''
      }));

    } catch (err) {
      // Debugging error message
      console.error("Error posting reply:", err);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    // Double check if the user really wants to delete the comment
    const confirmDelete = window.confirm("Are you sure you want to delete this comment and its replies?");
    if (!confirmDelete) return;

    try {
      // Send the backend a request to delete the comment
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
      // Debugging error message
      console.error("Failed to delete comment:", err);
    }
  };

  // Edit comment
  const handleEditComment = async (commentId) => {
    // Check if the comment is empty
    if (!editCommentText.trim()) return;

    try {
      // Send the backend a payload with the updated comment
      await axios.put(`http://localhost:3001/comments/${commentId}`,
        { comment: editCommentText },
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
      alert("You can only edit comments you've made.");
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-2 ml-10 mt-5">
        <ContainerTextFlip
          words={[
            "Welcome",
            "Fáilte",
            "Bienvenue",
            "Bienvenido",
            "Benvenuto",
            "Willkommen",
            "Welkom",
            "Bem-vindo",
            "مرحبًا",
            "欢迎",
            "स्वागत है"
          ]}
          interval={2000}
          className="text-6xl md:text-6xl font-extrabold text-blue-700"
          textClassName="text-white-700"
        />
        <span className="text-6xl md:text-6xl font-extrabold text-black-700 mb-4">
          to the EasyExchangeConnect Community!
        </span>
      </div>

      <h4 className="mb-3 font-nunito ml-10 mr-10 font-bold">
        This is your space to connect, share, and inspire. Whether you're a current student, a recent applicant,
        or an alumni of the exchange program, your insights can truly help others. Feel free to post about your
        journey — from applying to living abroad, adjusting to new cultures, making friends, or overcoming challenges.
      </h4>
      <h4 className="mb-3 font-nunito ml-10 mr-10 font-bold">
        We encourage open and honest experiences, but please keep things respectful. Avoid language that could be
        offensive, discriminatory, or harmful. This is a community built on inclusion, empathy, and support.
      </h4>
      <h4 className="font-nunito mb-5 ml-10 mr-10 font-bold">
        Replies are welcome! Ask questions, offer advice, or simply cheer others on. Let’s help each other make
        the most of EasyExchangeConnect.
      </h4>

      <h2 className="text-3xl font-bold ml-10 mt-10 mb-4">Community Comments</h2>

      {isLoggedIn && (
        <form onSubmit={handleAddComment} className="ml-10 mb-10">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-2 rounded border border-gray-300 w-[90%] max-w-4xl"
          />
          <br />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Submit Comment
          </button>
        </form>
      )}

      <ul className="ml-10 mr-10">
        {comments.map(comment => (
          <li
            key={comment.Comment_ID}
            className="mb-6 bg-gradient-to-r from-green-400 to-green-900 text-white p-6 rounded-3xl shadow"
          >
            <div>
              <div className="text-sm font-semibold mb-1">
                {comment.Comment_Creator_s || comment.Comment_Creator_l || "Unknown"}
                <span className="text-white/80 font-normal">
                  ,{" "}
                  {new Date(comment.Comment_DateCreated).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>

              {editingCommentId === comment.Comment_ID ? (
                <div>
                  <textarea
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="w-full mt-2 p-2 text-black rounded"
                  />
                  <br />
                  <button
                    onClick={() => handleEditComment(comment.Comment_ID)}
                    className="mt-2 px-3 py-1 bg-black text-green-500 font-semibold rounded hover:opacity-90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="ml-2 px-3 py-1 bg-black text-red-500 font-semibold rounded hover:opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="mt-2">{comment.Comment}</p>
              )}
            </div>

            <div className="mt-3">
              <button
                onClick={() => toggleReplies(comment.Comment_ID)}
                className="text-sm underline"
              >
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
                    className="ml-4 text-sm underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.Comment_ID)}
                    className="ml-4 text-sm text-red-200 underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {expandedComments.includes(comment.Comment_ID) && (
              <div className="ml-4 mt-4">
                <ul>
                  {(replies[comment.Comment_ID] || []).map(reply => (
                    <li key={reply.Reply_ID} className="mb-3">
                      <div className="text-sm font-semibold mb-1">
                        {reply.Reply_Creator_s || reply.Reply_Creator_l || "Unknown"}
                        <span className="text-white/80 font-normal">
                          ,{" "}
                          {new Date(reply.Reply_DateCreated).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                      <p>{reply.Reply}</p>
                    </li>
                  ))}
                </ul>

                {isLoggedIn && (
                  <div className="mt-2">
                    <textarea
                      placeholder="Write a reply..."
                      value={replyInputs[comment.Comment_ID] || ''}
                      onChange={(e) =>
                        setReplyInputs(prev => ({
                          ...prev,
                          [comment.Comment_ID]: e.target.value
                        }))
                      }
                      className="w-full p-2 mt-2 text-black rounded"
                    />
                    <br />
                    <button
                      onClick={() => handleAddReply(comment.Comment_ID)}
                      className="mt-2 px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100"
                    >
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
