// Add to /backend/routes/admin.js
const express = require("express");
const { adminLogin, getAdminProfile, adminRegister } = require("../controllers/adminController");
const { verifyToken } = require("../controllers/authController");
const router = express.Router();

router.post("/login", adminLogin);
router.get("/profile", verifyToken, getAdminProfile);
router.post("/register", adminRegister); // New admin registration route

module.exports = router;