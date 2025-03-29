const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const cors = require("cors");
app.use(cors());

const openai = require("./utils/openaiServices.js");

const { fetchUsers, createStudent } = require("./models/userModel");
const { fetchComments, makeComment } = require("./models/commentModel");
const { getAllCities } = require("./models/cityModel");
const { getAllCountries } = require("./models/countryModel");

const { login } = require("./controllers/authController"); // Import login controller

const authRoutes = require("./routes/auth"); // Import auth routes
const userRoutes = require("./routes/user"); // Import user routes
const adminRoutes = require("./routes/admin"); // Import admin routes
const commentRoutes = require("./routes/comments");
const universityRoutes = require("./routes/universities");
const adminUniversityRoutes = require("./routes/adminUniversities");

const port = 3001;

// Register authentication, user, and admin routes

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/universities", universityRoutes);
app.use("/admin", adminUniversityRoutes);
app.use("/comments", commentRoutes);

app.get("/Users", (req, res) => {
    fetchUsers((err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
            return;
        }
        res.json(results);
    });
});

app.get("/Comments", (req, res) => {
    fetchComments((err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
            return;
        }
        res.json(results);
    });
});

app.get("/cities", (req, res) => {
    getAllCities((err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
            return;
        }
        res.json(results);
    });
});

app.get("/countries", (req, res) => {
    getAllCountries((err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
            return;
        }
        res.json(results);
    });
});

app.post("/Comments", (req, res) => {
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ message: "Comment is required" });
    }

    makeComment(comment, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error inserting comment", error: err });
        }
        res.status(200).json({ message: "Comment added successfully", commentId: results.insertId });
    });
});

app.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: question }],
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching response" });
    }
});

// Register a new user
app.post('/Register', async (req, res) => {
    const { Student_ID, Student_FirstName, Student_LastName, Student_Email, Student_Username, Student_DOB, Student_Password } = req.body;

    if (!Student_ID || !Student_FirstName || !Student_LastName || !Student_Email || !Student_Username || !Student_DOB || !Student_Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(Student_Password, 10);

        // Create an object from request body
        const formData = {
            Student_ID,
            Student_FirstName,
            Student_LastName,
            Student_Email,
            Student_Username,
            Student_DOB,
            Student_Password: hashedPassword  // Store hashed password
        };

        // Call the function to create the student
        createStudent(formData, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error creating student user", error: err });
            }

            // Generate JWT Token
            const token = jwt.sign(
                { Student_ID, Student_Email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }  // Token expires in 1 hour
            );

            res.status(201).json({
                message: "Student user created successfully",
                token,  // Send JWT token to client
                user: {
                    Student_ID,
                    Student_FirstName,
                    Student_LastName,
                    Student_Email,
                    Student_Username
                }
            });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login route
app.post("/Login", login);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

