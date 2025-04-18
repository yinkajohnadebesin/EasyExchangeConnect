const express = require("express");
const { login, verifyToken, register } = require("../controllers/authController");
const { getUserProfile } = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifyToken, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
});

router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
