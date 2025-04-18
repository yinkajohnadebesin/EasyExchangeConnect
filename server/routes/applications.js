// Importing the necessary modules from other files and folders...
const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  submitApplication,
  fetchAllApplications,
  fetchApplicationByStudentId,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const { verifyToken, verifyAdminToken } = require("../utils/authMiddleware");

// Middleware to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination for file uploads
    cb(null, "uploads/applications");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ----------------------------------------------------ROUTES--------------------------------------------------

// This POSTs a new application (only logged in users can do this)
router.post("/", verifyToken, upload.single("GPA_Image"), submitApplication);

// This GETs all applications (only admin users can do this)
router.get("/", verifyAdminToken, fetchAllApplications);

// This GETs applications by student ID (only logged in users can do this)
router.get("/my-applications", verifyToken, fetchApplicationByStudentId);

// This PATCH updates the status of an application (only admin users can do this)
router.patch("/status/:id", verifyAdminToken, updateApplicationStatus);

module.exports = router;