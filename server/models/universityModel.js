const connection = require("../dbconnection");

const getAllUniversities = () => {
    return new Promise((resolve, reject) => {
        const query = ' SELECT u.University_ID, u.University_Name, u.Title, c.City_Name, co.Country_Name FROM Universities u JOIN Cities c ON u.City_ID = c.City_ID JOIN Country co ON c.Country_ID = co.Country_ID';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getUniversityById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT u.*, c.City_Name, co.Country_Name FROM Universities u JOIN Cities c ON u.City_ID = c.City_ID JOIN Country co ON c.Country_ID = co.Country_ID WHERE u.University_ID = ?';
        connection.query(query, [id], (err, results) => {
            if (err || results.length === 0) return reject(err || new Error("Not found"));
            resolve(results[0]);
        });
    });
};

const getUniversityProgrammes = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Programme_Code FROM University_Programmes WHERE University_ID = ?';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getUniversityImages = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT Image_URL, Caption FROM University_Images WHERE University_ID = ?";
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const insertUniversity = ({ University_Name, Title, City_ID, Description }) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Universities (University_Name, Title, City_ID, Description) VALUES (?, ?, ?, ?)";
        connection.query(query, [University_Name, Title, City_ID, Description], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getCityAndCountryByUniversity = (universityId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT Cities.City_ID, Country.Country_ID FROM Universities JOIN Cities ON Universities.City_ID = Cities.City_ID JOIN Country ON Cities.Country_ID = Country.Country_ID WHERE Universities.University_ID = ?";
        connection.query(query, [universityId], (err, results) => {
            if (err || results.length === 0) return reject(err || new Error("Not found"));
            resolve(results[0]);
        });
    });
};

const deleteUniversityImages = (universityId) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM University_Images WHERE University_ID = ?";
        connection.query(query, [universityId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const deleteUniversityById = (universityId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Universities WHERE University_ID = ?';
        connection.query(query, [universityId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const isCityUsed = (cityId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Universities WHERE City_ID = ?';
        connection.query(query, [cityId], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};

const deleteCityById = (cityId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Cities WHERE City_ID = ?';
        connection.query(query, [cityId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const isCountryUsed = (countryId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Cities WHERE Country_ID = ?';
        connection.query(query, [countryId], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};

const deleteCountryById = (countryId) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM Country WHERE Country_ID = ?";
        connection.query(query, [countryId], (err, results) => {
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
    getUniversityImages,
    getCityAndCountryByUniversity,
    deleteUniversityImages,
    deleteUniversityById,
    isCityUsed,
    deleteCityById,
    isCountryUsed,
    deleteCountryById,
};