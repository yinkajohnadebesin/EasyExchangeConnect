// Importing necessary modules and models...
const path = require("path");
const sendEmail = require("../utils/sendEmail");
const ApprovedTemplate = require("../utils/templates/approvedTemplate");
const RejectedTemplate = require("../utils/templates/rejectedTemplate");

const {
  // CREATE
  createApplication,
  // GETS
  getAllApplications,
  getApplicationsByStudentId,
  getApplicationById,
  // UPDATES
  applicationVerdictUpdate,
} = require("../models/applicationModel");

const { getUniversityById } = require("../models/universityModel");

// Submitting an application...
const submitApplication = async (req, res) => {
  try {
    const {
      Applicant_ID,
      First_Name,
      Last_Name,
      Email,
      Student_Number,
      GPA,
      Institution_Choice,
    } = req.body;

    const gpaImage = req.file;

    if (
      // Check if any required fields are missing
      !Applicant_ID || !First_Name || !Last_Name || !Email || !Student_Number ||
      !GPA || !gpaImage || !Institution_Choice
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const GPA_Image_URL = `uploads/applications/${gpaImage.filename}`;

    // Trigger the createApplication function imported from applicationModel.js
    const result = await createApplication({
      Applicant_ID,
      First_Name,
      Last_Name,
      Email,
      Student_Number,
      GPA,
      GPA_Image_URL,
      Institution_Choice,
    });

    res.status(201).json({
      message: "Application submitted successfully.",
      applicationId: result.insertId,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Error submitting application", error });
  }
};

// GETTING all applications (admin)...
const fetchAllApplications = async (req, res) => {
  try {
    // Trigger the getAllApplications function imported from applicationModel.js
    const applications = await getAllApplications();
    res.status(200).json(applications);
  } catch (error) {
    // Log the error for debugging purposes...
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

// GETTING applications by student...
const fetchApplicationByStudentId = async (req, res) => {
  const studentId = req.user?.Student_ID;

  // Check if the student ID is available and logged in...
  if (!studentId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Trigger the getApplicationsByStudentId function imported from applicationModel.js...
    const applications = await getApplicationsByStudentId(studentId);
    res.status(200).json(applications);
  } catch (error) {
    // Log the error for debugging purposes...
    console.error("Error fetching student's applications:", error);
    res.status(500).json({ message: "Failed to retrieve student applications" });
  }
};

// UPDATING the application status (admin)...
const updateApplicationStatus = async (req, res) => {
  const applicationId = req.params.id;
  const { status } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    // Trigger the applicationVerdictUpdate function imported from applicationModel.js...
    const updated = await applicationVerdictUpdate(applicationId, status);
    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    const application = await getApplicationById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found for email notification" });
    }

    const { Email, First_Name, Institution_Choice, Student_Number } = application;

    // Fetch university name...
    const universityDetails = await getUniversityById(Institution_Choice);
    const universityName = universityDetails.University_Name || "your selected university";

    const subject = "Your Application Status Has Been Updated";

    // Send email notification based on status...
    if (status === "Approved") {
      await sendEmail({
        to: Email,
        subject,
        html: ApprovedTemplate({ name: First_Name, university: universityName }),
        attachments: [
          {
            // Attachment for approved applications
            filename: "ExchangeForm.docx",
            path: path.join(__dirname, "../assets/ExchangeForm.docx"),
          },
        ],
      });
    } else {
      await sendEmail({
        to: Email,
        subject,
        html: RejectedTemplate({ name: First_Name, university: universityName }),
      });
    }

    res.status(200).json({ message: "Status updated and email sent successfully" });
  } catch (err) {
    // Log the error for debugging purposes...
    console.error("Error updating application status:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  submitApplication,
  fetchAllApplications,
  fetchApplicationByStudentId,
  updateApplicationStatus,
};
