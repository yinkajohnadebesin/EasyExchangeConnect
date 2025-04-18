const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const { findUserByEmail, createStudent } = require("../models/userModel");

dotenv.config();

// Login function for student users
const login = async (req, res) => {
    const { Student_Email, Student_Password } = req.body;
    if (!Student_Email || !Student_Password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await findUserByEmail(Student_Email);
        const passwordMatch = await bcrypt.compare(Student_Password, user.Student_Password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
              Student_ID: user.Student_ID,
              Student_Email: user.Student_Email,
              Student_Username: user.Student_Username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );          
          

          res.json({
            message: "Login successful",
            token,
            user: {
                Student_ID: user.Student_ID,
                Student_Email: user.Student_Email,
                Student_Username: user.Student_Username
            }
        });
        

    } catch (error) {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

const register = async (req, res) => {
    const {
      Student_ID,
      Student_FirstName,
      Student_LastName,
      Student_Email,
      Student_Username,
      Student_DOB,
      Student_Password,
    } = req.body;
  
    if (
      !Student_ID ||
      !Student_FirstName ||
      !Student_LastName ||
      !Student_Email ||
      !Student_Username ||
      !Student_DOB ||
      !Student_Password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Check if email is already registered
      const existingUser = await findUserByEmail(Student_Email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }
  
      const hashedPassword = await bcrypt.hash(Student_Password, 10);
  
      const formData = {
        Student_ID,
        Student_FirstName,
        Student_LastName,
        Student_Email,
        Student_Username,
        Student_DOB,
        Student_Password: hashedPassword,
      };
  
      await createStudent(formData);
  
      const token = jwt.sign(
        {
          Student_ID,
          Student_Email,
          Student_Username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(201).json({
        message: "Student user created successfully",
        token,
        user: {
          Student_ID,
          Student_FirstName,
          Student_LastName,
          Student_Email,
          Student_Username,
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = { login, verifyToken, register };