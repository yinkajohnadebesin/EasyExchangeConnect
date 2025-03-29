const connection = require("../dbconnection");

const insertCountry = (countryName) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO Country (Country_Name) VALUES (?)",
            [countryName],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            }
        );
    });
};

const getAllCountries = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT Country_ID, Country_Name FROM Country",
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

module.exports = {
    insertCountry,
    getAllCountries
};
