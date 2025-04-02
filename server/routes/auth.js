const express = require("express");
const { login, verifyToken, register } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/verify", verifyToken, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
