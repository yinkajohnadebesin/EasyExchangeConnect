// /backend/controllers/userController.js
const connection = require("../dbconnection");

// Get user profile
const getUserProfile = (req, res) => {
    const userId = req.user.Student_ID; // Extracted from JWT

    const query = "SELECT Student_ID, Student_FirstName, Student_LastName, Student_Email, Student_Username FROM Users WHERE Student_ID = ?";
    connection.query(query, [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(results[0]);
    });
};

module.exports = { getUserProfile };
