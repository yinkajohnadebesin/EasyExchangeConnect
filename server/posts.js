const connection = require('./dbconnection');

const makeComment = (comment, callback) => {
    const query = 'INSERT INTO Comments (Comment) VALUES (?)';

    connection.query(query, [comment], (err, results) => {
        if (err) {
            console.error('Error making comment:', err.message);
            return callback(err, null); // Pass error to callback
        }
        callback(null, results); // Pass the results back to callback
    });
}

module.exports = {
    makeComment,
};
