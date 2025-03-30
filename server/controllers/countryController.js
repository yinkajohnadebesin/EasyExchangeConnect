const { getAllCountries } = require("../models/countryModel");

const fetchCountries = async (req, res) => {
    try {
        const countries = await getAllCountries();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: "Error fetching countries", error });
    }
};

module.exports = { fetchCountries };