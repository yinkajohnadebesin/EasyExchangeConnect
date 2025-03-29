// /backend/routes/adminUniversities.js
const express = require("express");
const router = express.Router();
const connection = require("../dbconnection");

// POST create university (with optional new country/city)
router.post("/universities", (req, res) => {
    const {
        country_id,
        new_country,
        city_id,
        new_city,
        university_name,
        title,
        description
    } = req.body;

    let finalCountryId = country_id;
    let finalCityId = city_id;

    const insertCountry = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO Country (Country_Name) VALUES (?)",
                [new_country],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.insertId);
                }
            );
        });
    };

    const insertCity = (countryId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO Cities (City_Name, Country_ID, Population) VALUES (?, ?, ?)",
                [new_city, countryId, 0],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.insertId);
                }
            );
        });
    };

    const insertUniversity = (cityId) => {
        connection.query(
            "INSERT INTO Universities (University_Name, City_ID, Title, Description) VALUES (?, ?, ?, ?)",
            [university_name, cityId, title, description],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to insert university", error: err });
                }
                res.status(201).json({ message: "University created successfully!" });
            }
        );
    };

    (async () => {
        try {
            if (new_country) {
                finalCountryId = await insertCountry();
            }
            if (new_city) {
                finalCityId = await insertCity(finalCountryId);
            }
            insertUniversity(finalCityId);
        } catch (error) {
            res.status(500).json({ message: "Error creating university", error });
        }
    })();
});

module.exports = router;
