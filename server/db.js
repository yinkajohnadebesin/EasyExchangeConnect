const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const openai = require("./utils/openaiServices.js");

const { fetchUsers, fetchComments } = require("./fetches.js");
const { makeComment, createStudent } = require("./posts.js");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// API endpoint to fetch username and email
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

app.post('/Register', (req, res) => {
    const { Student_ID, Student_FirstName, Student_LastName, Student_Email, Student_Username, Student_DOB, Student_Password } = req.body;

    if (!Student_ID || !Student_FirstName || !Student_LastName || !Student_Email || !Student_Username || !Student_DOB || !Student_Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Create an object from request body
    const formData = {
        Student_ID,
        Student_FirstName,
        Student_LastName,
        Student_Email,
        Student_Username,
        Student_DOB,
        Student_Password
    };

    // Call the function with the correct argument
    createStudent(formData, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error creating student user from db.js", error: err });
        }
        res.status(200).json({ message: "Student user created successfully", formData: results });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
