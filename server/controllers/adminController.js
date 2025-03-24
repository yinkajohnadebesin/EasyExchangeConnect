// /backend/controllers/adminController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connection = require("../dbconnection"); // Import DB connection

dotenv.config();

// Admin login function
const adminLogin = (req, res) => {
    const { Lecturer_Email, Lecturer_Password } = req.body;
    if (!Lecturer_Email || !Lecturer_Password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = "SELECT * FROM Admins WHERE Lecturer_Email = ?";
    connection.query(query, [Lecturer_Email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const admin = results[0];
        const passwordMatch = await bcrypt.compare(Lecturer_Password, admin.Lecturer_Password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { Lecturer_ID: admin.Lecturer_ID, Lecturer_Email: admin.Lecturer_Email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Admin login successful", token, admin: { Lecturer_ID: admin.Lecturer_ID, Lecturer_Email: admin.Lecturer_Email } });
    });
};

// Get admin profile
const getAdminProfile = (req, res) => {
    const adminId = req.user.Lecturer_ID; // Extracted from JWT

    const query = "SELECT Lecturer_ID, Lecturer_FirstName, Lecturer_LastName, Lecturer_Email, Lecturer_Username FROM Admins WHERE Lecturer_ID = ?";
    connection.query(query, [adminId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(results[0]);
    });
};

// Register new admin
const adminRegister = async (req, res) => {
    const { Lecturer_ID, Lecturer_FirstName, Lecturer_LastName, Lecturer_Email, Lecturer_Username, Lecturer_DOB, Lecturer_Password } = req.body;

    if (!Lecturer_ID || !Lecturer_FirstName || !Lecturer_LastName || !Lecturer_Email || !Lecturer_Username || !Lecturer_DOB || !Lecturer_Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(Lecturer_Password, 10);

        const insertQuery = `INSERT INTO Admins (Lecturer_ID, Lecturer_FirstName, Lecturer_LastName, Lecturer_Email, Lecturer_Username, Lecturer_DOB, Lecturer_Password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        connection.query(
            insertQuery,
            [Lecturer_ID, Lecturer_FirstName, Lecturer_LastName, Lecturer_Email, Lecturer_Username, Lecturer_DOB, hashedPassword],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Error registering admin", error: err });
                }

                const token = jwt.sign(
                    { Lecturer_ID, Lecturer_Email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.status(201).json({
                    message: "Admin registered successfully",
                    token,
                    admin: {
                        Lecturer_ID,
                        Lecturer_FirstName,
                        Lecturer_LastName,
                        Lecturer_Email,
                        Lecturer_Username
                    }
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { adminLogin, getAdminProfile, adminRegister };
