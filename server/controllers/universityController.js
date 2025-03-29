const {
    getAllUniversities,
    getUniversityById,
    insertUniversity,
    getUniversityProgrammes,
    getUniversityImages
} = require("../models/universityModel");

const getUniversities = async (req, res) => {
    try {
        const universities = await getAllUniversities();
        res.json(universities);
    } catch (err) {
        res.status(500).json({ message: "Error fetching universities", error: err });
    }
};

const getUniversity = async (req, res) => {
    const universityId = req.params.id;

    try {
        const university = await getUniversityById(universityId);
        const programmes = await getUniversityProgrammes(universityId);
        const images = await getUniversityImages(universityId);

        res.json({
            ...university,
            Programmes: programmes.map(p => p.Programme_Code),
            Images: images
        });
    } catch (err) {
        res.status(404).json({ message: "University not found", error: err });
    }
};

const createUniversity = async (req, res) => {
    const { University_Name, Title, City_ID, Description } = req.body;

    try {
        const result = await insertUniversity({ University_Name, Title, City_ID, Description });
        res.status(201).json({ message: "University added successfully", universityId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: "Error adding university", error: err });
    }
};

module.exports = {
    getUniversities,
    getUniversity,
    createUniversity
};
