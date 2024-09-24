require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async => {
    try{
        mongoose.connect(db);
        console.log('MongoDB has been connected successfully');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;