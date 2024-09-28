const express = require("express");
const db = require('./config/db');
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Routes
const authRoute = require("./Routes/AuthRoute");

const { PORT } = process.env;
db();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["https://urban-connect-employee.onrender.com/", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get( "/", ( req, res ) => {
  res.send("Welcome");
})

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);
