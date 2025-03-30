// Importing the necessary modules from other files and folders...
const express = require("express");
const router = express.Router();

const { verifyAdminToken } = require("../utils/authMiddleware");

const { 
    getUniversities, 
    getUniversity, 
    createUniversity, 
    deleteUniversity 
} = require("../controllers/universityController");

// Routing to the universityController.js to handle CRUD operations...

// This will GET all universities and display them on the page
router.get("/", getUniversities);

// This will GET a specific university by its ID and display its details on the page
router.get("/:id", getUniversity);

// THIS will CREATE a new university (only adminss can do this)
router.post("/", createUniversity);

// This DELETES a specified university by its ID (also only admins can do this)
router.delete("/:id", verifyAdminToken, deleteUniversity);

module.exports = router;