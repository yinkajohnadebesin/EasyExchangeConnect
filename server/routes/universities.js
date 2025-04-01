// Importing the necessary modules from other files and folders...
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { verifyAdminToken } = require("../utils/authMiddleware");

const { 
    addProgrammeCode,
    getUniversities,
    getUniversity, 
    createUniversity, 
    deleteUniversity,
    removeUniProgrammeCode,
    changeUni,
} = require("../controllers/universityController");

// -----------------------------------------------------IMAGE UPLOAD--------------------------------------------
// Handlign the uploading of imgaes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/universities"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ----------------------------------------------------ROUTES--------------------------------------------------
// Routing to the universityController.js to handle CRUD operations...

// This will DELETE THE university programme code from the list of the specified university
router.delete("/edit/:id/programmes/:code", verifyAdminToken, removeUniProgrammeCode);

// This CREATES the programme code for a specified university and their details
router.post("/edit/:id/programmes", verifyAdminToken, addProgrammeCode);

// This will GET all universities and display them on the page
router.get("/", getUniversities);

// This will GET a specific university by its ID and display its details on the page
router.get("/:id", getUniversity);

// This will UPDATE a specific university by its ID (only admins can do this)
router.put("/edit/:id", verifyAdminToken, upload.single("Image"), changeUni);

// THIS will CREATE a new university (only adminss can do this)
router.post("/", createUniversity);

// This DELETES a specified university by its ID (also only admins can do this)
router.delete("/:id", verifyAdminToken, deleteUniversity);

module.exports = router;