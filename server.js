const express = require("express");
const db = require('./config/db');
const cors = require("cors");
const helmet = require('helmet');
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Routes
const authRoute = require("./Routes/AuthRoute");

const { PORT } = process.env;
db();

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// CORS
app.use(
  cors({
    origin: [
      "https://urban-connect-employee.onrender.com",
      "http://localhost:5174", 
      "http://localhost:5175", 
      "http://localhost:5176"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Helmet for security headers
app.use(helmet());

// custom CSP header via Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      imgSrc: ["'self'", "data:", "https://urban-connect-employee.onrender.com"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
    },
  })
);

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Middleware for cookies and JSON handling
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/", authRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
