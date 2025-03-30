const express = require("express");
const router = express.Router();
const { fetchCities } = require("../controllers/cityController");

router.get("/", fetchCities);

module.exports = router;
