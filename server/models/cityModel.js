const connection = require("../dbconnection");

const insertCity = (cityName, countryId, population = 0) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO Cities (City_Name, Country_ID, Population) VALUES (?, ?, ?)",
            [cityName, countryId, population],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            }
        );
    });
};

const getAllCities = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT City_ID, City_Name FROM Cities",
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

module.exports = {
    insertCity,
    getAllCities
};
