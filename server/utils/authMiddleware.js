const jwt = require("jsonwebtoken");

const getTokenFromHeader = (req) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return null;
  return authHeader.replace("Bearer ", "");
};

// General user or admin verification
const verifyToken = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to req.user
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Strict admin-only check (already correct)
const verifyAdminToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
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
  verifyAdminToken,
};
