// /backend/routes/user.js
const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();

// Protected route: Get user profile
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
