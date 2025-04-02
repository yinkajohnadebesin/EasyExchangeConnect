const express = require("express");
const router = express.Router();
const { handleYinkaQuery } = require("../controllers/openaiController");

router.post("/", handleYinkaQuery);

module.exports = router;