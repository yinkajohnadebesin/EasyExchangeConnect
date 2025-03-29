const express = require("express");
const router = express.Router();
const { createUniversity } = require("../controllers/universityController");

router.post("/universities", createUniversity);

module.exports = router;
