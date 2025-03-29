const { fetchComments, makeComment } = require("../models/commentModel");

// GET all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await fetchComments();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};

// POST new comment
const createComment = async (req, res) => {
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
        return res.status(400).json({ message: "Comment is required" });
    }

    try {
        const result = await makeComment(comment);
        res.status(201).json({ message: "Comment added successfully", commentId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error });
    }
};

module.exports = {
    getAllComments,
    createComment
};
