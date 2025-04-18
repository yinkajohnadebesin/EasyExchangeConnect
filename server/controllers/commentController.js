const {
    // GETS
    fetchComments,
    fetchRepliesByCommentId,
    getCommentById,
    // CREATE
    makeComment,
    makeReply,
    // DELETES
    deleteCommentById,
    deleteRepliesByCommentId,
    // UPDATES
    updateCommentById
} = require("../models/commentModel");

// GETTING all comments... 
const getAllComments = async (req, res) => {
    try {
        const comments = await fetchComments();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};

// CREATING a new comment...
const createComment = async (req, res) => {
    const { comment } = req.body;

    // Check if the user is logged in and has a username...
    const studentUsername = req.user?.Student_Username || null;
    const lecturerUsername = req.user?.Lecturer_Username || null;

    // Ensures there are no empty comments...
    if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "You need to make a comment" });
    }
    
    try {
        // Trigger the makeComment function imported from commentModel.js...  
        const result = await makeComment(comment, studentUsername, lecturerUsername);

        res.status(201).json({
            message: "Comment added successfully",
            commentId: result.insertId,
            studentUsername,
            lecturerUsername
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong adding comment", error });
    }
};

// GETTING replies for a comment...
const getReplies = async (req, res) => {
    const { id: commentId } = req.params;

    try {
        const replies = await fetchRepliesByCommentId(commentId);
        res.json(replies);
    } catch (error) {
        res.status(500).json({ message: "Can't fetch replies", error });
    }
};

// CREATING a new reply...
const createReply = async (req, res) => {
    const { reply, commentId } = req.body;

    // Ensuring the replies are not empty...
    if (!reply || !commentId) {
        return res.status(400).json({ message: "Reply and comment ID are required" });
    }

    try {
        // Check if the user is logged in and has a username...
        const studentUsername = req.user.Student_Username || null;
        const lecturerUsername = req.user.Lecturer_Username || null;

        // Trigger the makeReply function imported from commentModel.js...
        const result = await makeReply({
            commentId,
            reply,
            studentUsername,
            lecturerUsername
        });

        res.status(201).json({
            message: "Reply added successfully",
            replyId: result.insertId,
            studentUsername,
            lecturerUsername
        });
    } catch (error) {
        res.status(500).json({ message: "Somethign went wrong adding reply", error });
    }
};

// DELETING a comment and its replies...
const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const user = req.user;

    // checking if the user is a student or a lecturer...
    const studentUsername = user?.Student_Username || null;
    const lecturerUsername = user?.Lecturer_Username || null;

    const isAdmin = lecturerUsername ? true : false;
    const username = lecturerUsername || studentUsername;

    try {
        // Trigger the deleteRepliesByCommentId function imported from commentModel.js...
        await deleteRepliesByCommentId(commentId);

        // Trigger the deleteCommentById function imported from commentModel.js...
        const result = await deleteCommentById(commentId, username, isAdmin);

        if (result.affectedRows === 0) {
            return res.status(403).json({ message: "You can only delete comments you made." });
        }

        res.status(200).json({ message: "Comment and its replies deleted successfully" });
    } catch (err) {
        // logging the error for debugging purposes...
        console.error("Error deleting comment:", err);
        res.status(500).json({ message: err.message || "Failed to delete comment" });
    }
};

// UPDATING a comment...
const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { comment } = req.body;
    const user = req.user;

    // Ensuring the updated comment is not empty...
    if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "Comment is required" });
    }

    try {
        // Trigger the getCommentById function imported from commentModel.js...
        const existing = await getCommentById(commentId);

        if (!existing) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Checking the owner of the comment to authorize editing...
        const isOwner =
            (existing.Comment_Creator_s && existing.Comment_Creator_s === user.Student_Username) ||
            (existing.Comment_Creator_l && existing.Comment_Creator_l === user.Lecturer_Username);

        if (!isOwner) {
            return res.status(403).json({ message: "You can only edit your own comment" });
        }

        // Trigger the updateCommentById function imported from commentModel.js...
        await updateCommentById(commentId, comment);

        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        // logging the error for debugging purposes...
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Failed to update comment", error });
    }
};

module.exports = {
    getAllComments,
    createComment,
    getReplies,
    createReply,
    deleteComment,
    updateComment,
};
