const connection = require("../dbconnection");

const getAllUniversities = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                u.University_ID, 
                u.University_Name, 
                u.Title, 
                c.City_Name, 
                co.Country_Name
            FROM Universities u
            JOIN Cities c ON u.City_ID = c.City_ID
            JOIN Country co ON c.Country_ID = co.Country_ID
        `;
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getUniversityById = (id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT u.*, c.City_Name, co.Country_Name
            FROM Universities u
            JOIN Cities c ON u.City_ID = c.City_ID
            JOIN Country co ON c.Country_ID = co.Country_ID
            WHERE u.University_ID = ?
        `;
        connection.query(query, [id], (err, results) => {
            if (err || results.length === 0) return reject(err || new Error("Not found"));
            resolve(results[0]);
        });
    });
};

const getUniversityProgrammes = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Programme_Code FROM University_Programmes WHERE University_ID = ?`;
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getUniversityImages = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT Image_URL, Caption FROM University_Images WHERE University_ID = ?`;
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const insertUniversity = ({ University_Name, Title, City_ID, Description }) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Universities (University_Name, Title, City_ID, Description)
            VALUES (?, ?, ?, ?)
        `;
        connection.query(query, [University_Name, Title, City_ID, Description], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


module.exports = {
    insertUniversity,
    getAllUniversities,
    getUniversityById,
    getUniversityProgrammes,
    getUniversityImages
};
