const Employee = require('../Models/Employee');
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY || "I3i1df8fpwQNLRcLGkLBlh3WpZr8Mw2Dk1YEVh8uA0I=");

    // Find the user in the database
    const user = await Employee.findById(decoded.id);

    // If user is found, return success response
    if (user) {
      return res.status(200).json({ status: true, user: user.username });
    } else {
      // If user not found, return unauthorized
      return res.status(404).json({ status: false, message: "User not found" });
    }

  } catch (error) {
    // Handle JWT errors (e.g., expired, invalid token)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ status: false, message: "Invalid token" });
    } else {
      // Catch any other unexpected errors
      console.error("Error verifying token:", error);
      return res.status(500).json({ status: false, message: "Server error" });
    }
  }
};
