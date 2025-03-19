// /backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connection = require("../dbconnection"); // Import DB connection

dotenv.config();

// User login function
const login = (req, res) => {
    const { Student_Email, Student_Password } = req.body;
    if (!Student_Email || !Student_Password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = "SELECT * FROM Users WHERE Student_Email = ?";
    connection.query(query, [Student_Email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(Student_Password, user.Student_Password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { Student_ID: user.Student_ID, Student_Email: user.Student_Email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, user: { Student_ID: user.Student_ID, Student_Email: user.Student_Email } });
    });
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = { login, verifyToken };
