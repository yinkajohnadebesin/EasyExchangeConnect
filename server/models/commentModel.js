const connection = require('../dbconnection');

// querying the database for comments and replies...
const fetchComments = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Comment_ID, Comment, Comment_Creator_s, Comment_Creator_l, Comment_DateCreated FROM Comments ORDER BY Comment_DateCreated ASC';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Inserting a new comment into the database...
const makeComment = (comment, studentUsername, lecturerUsername) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Comments (Comment, Comment_Creator_s, Comment_Creator_l) VALUES (?, ?, ?)';
        connection.query(query, [comment, studentUsername || null, lecturerUsername || null], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Selecting replies from the database based on the comment ID...
const fetchRepliesByCommentId = (commentId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Reply_ID, Reply, Reply_Creator_s, Reply_Creator_l, Reply_DateCreated FROM Replies WHERE Comment_ID = ?';
        connection.query(query, [commentId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Inserting a new reply into the database...
const makeReply = ({ commentId, reply, studentUsername, lecturerUsername }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Replies (Reply, Comment_ID, Reply_Creator_s, Reply_Creator_l) VALUES (?, ?, ?, ?)';
        connection.query(query, [reply, commentId, studentUsername, lecturerUsername], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Deleting replies based on the comment ID...
const deleteRepliesByCommentId = (commentId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Replies WHERE Comment_ID = ?';
        connection.query(query, [commentId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Deleting a comment based on the comment ID and username (admin or user)...
const deleteCommentById = (commentId, username, isAdmin = false) => {
    return new Promise((resolve, reject) => {
        let query = 'DELETE FROM Comments WHERE Comment_ID = ? AND ';
        let queryParams = [commentId];

        if (isAdmin) {
            query += 'Comment_Creator_l = ?';
            queryParams.push(username);
        } else {
            query += 'Comment_Creator_s = ?';
            queryParams.push(username);
        }

        connection.query(query, queryParams, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Selecting a comment by its ID...
const getCommentById = (commentId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Comments WHERE Comment_ID = ?';
        connection.query(query, [commentId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

// Updating a comment by its ID...
const updateCommentById = (commentId, newComment) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE Comments SET Comment = ? WHERE Comment_ID = ?`;
        connection.query(query, [newComment, commentId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    fetchComments,
    makeComment,
    fetchRepliesByCommentId,
    makeReply,
    deleteRepliesByCommentId,
    deleteCommentById,
    getCommentById,
    updateCommentById
};
