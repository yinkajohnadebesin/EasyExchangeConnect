const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const path = require("path");
const cors = require("cors");
app.use(cors());

const authRoutes = require("./routes/auth"); // Import auth routes
const userRoutes = require("./routes/user"); // Import user routes
const adminRoutes = require("./routes/admin"); // Import admin routes
const commentRoutes = require("./routes/comments");
const universityRoutes = require("./routes/universities");
const countryRoutes = require("./routes/countries");
const cityRoutes = require("./routes/cities");
const adminUniversityRoutes = require("./routes/adminUniversities");
const openaiRoutes = require("./routes/openai");

const port = 3001;

// Middleware to handle picutre uploads from the frontend
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register authentication, user, and admin routes
app.use("/ask", openaiRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/universities", universityRoutes);
app.use("/admin", adminUniversityRoutes);
app.use("/comments", commentRoutes);
app.use("/countries", countryRoutes);
app.use("/cities", cityRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});