const connection = require("../dbconnection");

const findAdminByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Lecturer_ID, Lecturer_Email, Lecturer_Username, Lecturer_Password FROM Admins WHERE Lecturer_Email = ?`;
        connection.query(query, [email], (err, results) => {
            if (err || results.length === 0) return reject("Admin not found");
            resolve(results[0]);
        });
    });
};


const insertAdmin = (adminData) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Admins (
                Lecturer_ID, Lecturer_FirstName, Lecturer_LastName,
                Lecturer_Email, Lecturer_Username, Lecturer_DOB, Lecturer_Password
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const {
            Lecturer_ID, Lecturer_FirstName, Lecturer_LastName,
            Lecturer_Email, Lecturer_Username, Lecturer_DOB, Lecturer_Password
        } = adminData;

        connection.query(query, [
            Lecturer_ID,
            Lecturer_FirstName,
            Lecturer_LastName,
            Lecturer_Email,
            Lecturer_Username,
            Lecturer_DOB,
            Lecturer_Password
        ], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};

const getAdminProfileById = (adminId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT Lecturer_ID, Lecturer_FirstName, Lecturer_LastName,
                   Lecturer_Email, Lecturer_Username
            FROM Admins
            WHERE Lecturer_ID = ?
        `;
        connection.query(query, [adminId], (err, results) => {
            if (err || results.length === 0) return reject(err || new Error("Admin not found"));
            resolve(results[0]);
        });
    });
};

module.exports = {
    findAdminByEmail,
    insertAdmin,
    getAdminProfileById
};
