// Importing the necessary modules from other files and folders...
const express = require("express");
const router = express.Router();
const {
    getAllComments,
    createComment,
    getReplies,
    createReply,
    deleteComment,
    updateComment,
} = require("../controllers/commentController");

const { verifyToken } = require("../utils/authMiddleware");

// ----------------------------------------------------ROUTES--------------------------------------------------

// This GETS all comments and display them on the page
router.get("/", getAllComments);

// This CREATES a new comment (only logged in users can do this)
router.post("/", verifyToken, createComment);

// This GETS a comment's replies
router.get("/:id/replies", getReplies);

// This CREATES all replies for a specific comment
router.post("/replies", verifyToken, createReply);

// This DELETES a specified comment by its ID (only logged in users can do this)
router.delete("/:id", verifyToken, deleteComment);

// This UPDATES a specified comment by its ID (only logged in users can do this)
router.put("/:id", verifyToken, updateComment);

module.exports = router;
