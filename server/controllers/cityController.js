const { getAllCities } = require("../models/cityModel");

const fetchCities = async (req, res) => {
    try {
        const cities = await getAllCities();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cities", error });
    }
};

module.exports = { fetchCities };