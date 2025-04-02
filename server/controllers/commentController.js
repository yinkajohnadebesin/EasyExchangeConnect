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

    const studentUsername = req.user?.Student_Username || null;
    const lecturerUsername = req.user?.Lecturer_Username || null;

    if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "You need to make a comment" });
    }

    try {
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

    if (!reply || !commentId) {
        return res.status(400).json({ message: "Reply and comment ID are required" });
    }

    try {
        const studentUsername = req.user.Student_Username || null;
        const lecturerUsername = req.user.Lecturer_Username || null;

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

    const studentUsername = user?.Student_Username || null;
    const lecturerUsername = user?.Lecturer_Username || null;

    const isAdmin = !!lecturerUsername;
    const username = lecturerUsername || studentUsername;

    try {
        await deleteRepliesByCommentId(commentId);

        const result = await deleteCommentById(commentId, username, isAdmin);

        if (result.affectedRows === 0) {
            return res.status(403).json({ message: "You can only delete comments you made." });
        }

        res.status(200).json({ message: "Comment and its replies deleted successfully" });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ message: err.message || "Failed to delete comment" });
    }
};

// UPDATING a comment...
const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { comment } = req.body;
    const user = req.user;

    if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "Comment is required" });
    }

    try {
        const existing = await getCommentById(commentId);

        if (!existing) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const isOwner =
            (existing.Comment_Creator_s && existing.Comment_Creator_s === user.Student_Username) ||
            (existing.Comment_Creator_l && existing.Comment_Creator_l === user.Lecturer_Username);

        if (!isOwner) {
            return res.status(403).json({ message: "You can only edit your own comment" });
        }

        await updateCommentById(commentId, comment);
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
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
