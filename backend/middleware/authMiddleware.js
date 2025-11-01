const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware hit");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
      return; // <-- Add return here to stop execution after success
    } catch (error) {
      console.error("Token failed:", error.message);
      res.status(401).json({ error: "Not authorized, token failed" });
      return; // <-- FIX 1: Added return
    }
  }

  if (!token) {
    console.log("No token found");
    res.status(401).json({ error: "Not authorized, no token" });
    return; // <-- FIX 2: Added return
  }
};

module.exports = authMiddleware;