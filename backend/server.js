// 1. maybe the file be named as index.js
// 2. nodemon - to dynamically change the content as per we write & save code
// 3. add any sensitive codes in env file
// import "express";

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// For API connectivity (to handle different types of data)
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({origin: true, credentials: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Database Connect
const connectDB = require('./config/db')
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome Home")
})

/* Middleware (middleware acts as middleman between user and server)
    res -> request
    req -> response
    next -> Pointer
*/

app.use((req, res, next) => {
    console.log("path is " + req.path + " and method is " + req.method);
    next(); //next should be called to goto next endpoint else response will get stuck in middleware
})

// app.use('http://localhost:4000/static/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Server Running on PORT ${port}`);
})