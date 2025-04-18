const connection = require("../dbconnection");

// Creating a new application in the database...
const createApplication = (applicationData) => {
  const {
    Applicant_ID,
    First_Name,
    Last_Name,
    Email,
    Student_Number,
    GPA,
    GPA_Image_URL,
    Institution_Choice
  } = applicationData;

  const query = `
    INSERT INTO Applications (
      Applicant_ID, First_Name, Last_Name, Email,
      Student_Number, GPA, GPA_Image_URL, Institution_Choice
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    Applicant_ID,
    First_Name,
    Last_Name,
    Email,
    Student_Number,
    GPA,
    GPA_Image_URL,
    Institution_Choice
  ];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Selecting all applications from the database...
const getAllApplications = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        a.Application_ID,
        a.Applicant_ID,
        a.First_Name,
        a.Last_Name,
        a.Email,
        a.Student_Number,
        a.GPA,
        a.GPA_Image_URL,
        u.University_Name AS Institution_Choice,
        a.Status,
        a.Application_Submit_Date
      FROM Applications a
      LEFT JOIN Universities u ON a.Institution_Choice = u.University_ID
      ORDER BY a.Application_Submit_Date DESC
    `;
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Selecting applications by student ID from the database...
const getApplicationsByStudentId = (studentId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT a.*, u.University_Name
      FROM Applications a
      JOIN Universities u ON a.Institution_Choice = u.University_ID
      WHERE a.Applicant_ID = ?
    `;
    connection.query(query, [studentId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Updating the application verdict in the database...
const applicationVerdictUpdate = (applicationId, status) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE Applications SET Status = ? WHERE Application_ID = ?';
    connection.query(query, [status, applicationId], (err, results) => {
      if (err) return reject(err);
      resolve(results.affectedRows > 0);
    });
  });
};

// Selecting a specific application by ID from the database...
const getApplicationById = (applicationId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT Application_ID, First_Name, Last_Name, Email, Student_Number, Institution_Choice FROM Applications WHERE Application_ID = ?';
    connection.query(query, [applicationId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationsByStudentId,
  applicationVerdictUpdate,
  getApplicationById,
};