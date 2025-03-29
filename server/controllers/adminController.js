const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const { findAdminByEmail, insertAdmin, getAdminProfileById } = require("../models/adminModel");

dotenv.config();

const adminLogin = async (req, res) => {
    const { Lecturer_Email, Lecturer_Password } = req.body;

    if (!Lecturer_Email || !Lecturer_Password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const admin = await findAdminByEmail(Lecturer_Email);
        const passwordMatch = await bcrypt.compare(Lecturer_Password, admin.Lecturer_Password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { Lecturer_ID: admin.Lecturer_ID, Lecturer_Email: admin.Lecturer_Email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Admin login successful",
            token,
            admin: {
                Lecturer_ID: admin.Lecturer_ID,
                Lecturer_Email: admin.Lecturer_Email
            }
        });

    } catch (error) {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

const getAdminProfile = async (req, res) => {
    try {
        const admin = await getAdminProfileById(req.user.Lecturer_ID);
        res.json(admin);
    } catch (error) {
        res.status(404).json({ message: "Admin not found", error });
    }
};

const adminRegister = async (req, res) => {
    const {
        Lecturer_ID, Lecturer_FirstName, Lecturer_LastName,
        Lecturer_Email, Lecturer_Username, Lecturer_DOB, Lecturer_Password
    } = req.body;

    if (!Lecturer_ID || !Lecturer_FirstName || !Lecturer_LastName ||
        !Lecturer_Email || !Lecturer_Username || !Lecturer_DOB || !Lecturer_Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(Lecturer_Password, 10);

        await insertAdmin({
            Lecturer_ID,
            Lecturer_FirstName,
            Lecturer_LastName,
            Lecturer_Email,
            Lecturer_Username,
            Lecturer_DOB,
            Lecturer_Password: hashedPassword
        });

        const token = jwt.sign(
            { Lecturer_ID, Lecturer_Email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "Admin registered successfully",
            token,
            admin: {
                Lecturer_ID,
                Lecturer_FirstName,
                Lecturer_LastName,
                Lecturer_Email,
                Lecturer_Username
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error registering admin", error });
    }
};

module.exports = {
    adminLogin,
    getAdminProfile,
    adminRegister
};
