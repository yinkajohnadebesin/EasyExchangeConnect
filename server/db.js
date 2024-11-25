require('dotenv').config(); // Load environment variables
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const { fetchUsers, fetchComments } = require('./fetches')

const app = express();
const port = 3001;

app.use(cors());

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


// Start the server
app.listen(port, () => {
    console.log('Server running on port 3001...');
});
