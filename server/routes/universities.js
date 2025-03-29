const express = require("express");
const router = express.Router();
const { getUniversities, getUniversity, createUniversity } = require("../controllers/universityController");

router.get("/", getUniversities);
router.get("/:id", getUniversity);
router.post("/", createUniversity);

module.exports = router;
