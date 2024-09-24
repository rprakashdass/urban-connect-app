require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// For API connectivity (to handle different types of data)
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

// Routes
const authRoute = require('./Routes/AuthRoute');


// Database Connect
const connectDB = require('./config/db')
connectDB();


app.use(
    cors(
        {
            origin: ["http://localhost:5000"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        }
    )
)

app.listen(port, () => {
    console.log(`Server Running on PORT ${port}`);
})

app.use(cors({origin: true, credentials: true}))
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoute);