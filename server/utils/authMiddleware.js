const jwt = require("jsonwebtoken");

const getTokenFromHeader = (req) => req.header("Authorization");

// General user or admin verification
const verifyToken = (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // user OR admin gets attached
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Strict admin-only check
const verifyAdminToken = (req, res, next) => {
    const token = getTokenFromHeader(req);
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
