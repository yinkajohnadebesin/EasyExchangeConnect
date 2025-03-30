const jwt = require("jsonwebtoken");

// User token verification...
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Admin token verification... 
const verifyAdminToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.Lecturer_ID) {
            return res.status(403).json({ message: "Forbidden: Admin access only" });
        }

        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = {
    verifyToken,
    verifyAdminToken
};
