const express = require("express");
const router = express.Router();
const { fetchCountries } = require("../controllers/countryController"); // or countryController

router.get("/", fetchCountries);

module.exports = router;
