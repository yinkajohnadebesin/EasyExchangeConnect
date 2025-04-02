const express = require("express");
const router = express.Router();
const { fetchCountries } = require("../controllers/countryController");

router.get("/", fetchCountries);

module.exports = router;
