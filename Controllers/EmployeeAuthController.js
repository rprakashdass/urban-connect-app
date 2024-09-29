require("dotenv").config();
const User = require("../Models/Employee");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.EmpSignup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword, username, createdAt });

    // Create JWT token
    const token = createSecretToken(user._id);

    // Send cookie with token
    res.cookie('token', process.env.TOKEN_KEY, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    
    // Respond with success message and user data
    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.EmpLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = createSecretToken(user._id);

    // Send cookie with token
    res.cookie("token", token, {
      httpOnly: true, // For security, don't allow access via client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "strict", // Prevent CSRF
    });

    // Respond with success message
    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
