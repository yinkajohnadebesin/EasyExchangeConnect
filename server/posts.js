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

const createStudent = (formData, callback) => {
    const query = `INSERT INTO Users (Student_ID, Student_FirstName, Student_LastName, Student_Email, Student_Username, Student_DOB, Student_Password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [
        formData.Student_ID,
        formData.Student_FirstName,
        formData.Student_LastName,
        formData.Student_Email,
        formData.Student_Username,
        formData.Student_DOB,
        formData.Student_Password
    ], (err, results) => {
        if (err) {
            console.error('Error creating student user:', err.message);
            return callback(err, null);
        }
        callback(null, results);
    });
};


module.exports = {
    makeComment,
    createStudent,
};
