require('dotenv').config(); // Load environment variables
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const { fetchUsers, fetchComments } = require('./fetches')
const { makeComment } = require('./posts')

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// API endpoint to fetch username and email
app.get('/Users', (req, res) => {
    fetchUsers((err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results); // Send the results as JSON
    });
});
app.get('/Comments', (req, res) => {
    fetchComments((err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results); // Send the results as JSON
    });
});

// ----------------------------------------------------------------

app.post('/Comments', (req, res) => {
    const { comment } = req.body; // Get comment from request body

    if (!comment) {
        return res.status(400).json({ message: 'Comment is required' });
    }

    // Call the makeComment function to insert the comment into the database
    makeComment(comment, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting comment', error: err });
        }
        res.status(200).json({ message: 'Comment added successfully', commentId: results.insertId });
    });
});

// ----------------------------------------------------------------

// Start the server
app.listen(port, () => {
    console.log('Server running on port 3001...');
});
