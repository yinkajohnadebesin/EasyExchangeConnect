const express = require("express");
const router = express.Router();
const connection = require("../dbconnection");

// GET all universities with basic info
router.get("/", (req, res) => {
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
        if (err) {
            return res.status(500).json({ message: "Error fetching universities", error: err });
        }
        res.json(results);
    });
});

// GET a single university with full details (description, programmes, images)
router.get("/:id", (req, res) => {
    const universityId = req.params.id;

    const uniQuery = `
        SELECT 
            u.*, c.City_Name, co.Country_Name
        FROM Universities u
        JOIN Cities c ON u.City_ID = c.City_ID
        JOIN Country co ON c.Country_ID = co.Country_ID
        WHERE u.University_ID = ?
    `;

    const programmesQuery = `
        SELECT Programme_Code FROM University_Programmes WHERE University_ID = ?
    `;

    const imagesQuery = `
        SELECT Image_URL, Caption FROM University_Images WHERE University_ID = ?
    `;

    connection.query(uniQuery, [universityId], (err, uniResults) => {
        if (err || uniResults.length === 0) {
            return res.status(404).json({ message: "University not found", error: err });
        }

        const university = uniResults[0];

        connection.query(programmesQuery, [universityId], (err, programmeResults) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching programmes", error: err });
            }

            connection.query(imagesQuery, [universityId], (err, imageResults) => {
                if (err) {
                    return res.status(500).json({ message: "Error fetching images", error: err });
                }

                res.json({
                    ...university,
                    Programmes: programmeResults.map(p => p.Programme_Code),
                    Images: imageResults
                });
            });
        });
    });
});

// POST a new university
router.post("/", (req, res) => {
    const { University_Name, Title, City_ID, Description } = req.body;

    const query = `
        INSERT INTO Universities (University_Name, Title, City_ID, Description)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(query, [University_Name, Title, City_ID, Description], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error adding university", error: err });
        }
        res.status(201).json({ message: "University added successfully", universityId: results.insertId });
    });
});


module.exports = router;
