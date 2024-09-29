const express = require("express");
const db = require('./config/db');
const cors = require("cors");
const helmet = require('helmet');
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

// env
const adminUrl = process.env.ADMIN_URL;
const agencyUrl = process.env.AGENCY_URL;
const employeeUrl = process.env.EMPLOYEE_URL;
const deptUrl = process.env.DEPARTMENT_URL;


// Routes
const authRoute = require("./Routes/AuthRoute");
const collectionRoute = require("./Routes/CollectionRoute")

const { PORT } = process.env;
db();

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// CORS
app.use(
  cors({
    origin: [ deptUrl, employeeUrl, agencyUrl, adminUrl ],
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
      imgSrc: ["'self'", "data:", "https://urban-connect.e.onrender.com"],
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
app.use("/db/", collectionRoute)

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
