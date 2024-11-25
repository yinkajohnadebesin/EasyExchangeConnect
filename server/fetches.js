const connection = require('./dbConnection'); // Import the database connection

const fetchUsers = (callback) => {
    const query = 'SELECT Student_Username, Student_Email FROM Users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return callback(err, null);
        }
        callback(null, results); // Pass the results back via the callback
    });
};

const fetchComments = (callback) => {
    const query = 'SELECT Comment_ID, Comment from Comments';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err.message);
            return callback(err, null);
        }
        callback(null, results); // Pass the results back via the callback
    })
}
module.exports = {
    fetchUsers,
    fetchComments,
};
