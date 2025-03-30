// /backend/routes/auth.js
const express = require("express");
const { login, verifyToken, register } = require("../controllers/authController");
const router = express.Router();

// Login route
router.post("/login", login);
router.post("/register", register);

// Token verification route (optional, useful for protected routes)
router.get("/verify", verifyToken, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
