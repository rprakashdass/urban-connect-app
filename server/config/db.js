require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async => {
    try{
        mongoose.connect(
            MONGO_URI,{}
        );
        console.log('MongoDB has been connected successfully');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;