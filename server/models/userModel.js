const connection = require('../dbconnection');

const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Student_Username, Student_Email FROM Users';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const createStudent = (formData) => {
    return new Promise((resolve, reject) => {
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
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getUserProfileById = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT Student_ID, Student_FirstName, Student_LastName, Student_Email, Student_Username
            FROM Users
            WHERE Student_ID = ?
        `;
        connection.query(query, [userId], (err, results) => {
            if (err || results.length === 0) return reject(err || new Error("User not found"));
            resolve(results[0]);
        });
    });
}

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Users WHERE Student_Email = ?";
        connection.query(query, [email], (err, results) => {
            if (err || results.length === 0) return reject(err || new Error("User not found"));
            resolve(results[0]);
        });
    });
};

module.exports = {
    fetchUsers,
    createStudent,
    getUserProfileById,
    findUserByEmail
};
