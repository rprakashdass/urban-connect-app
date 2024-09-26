require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (id) => {
    const secretKey = process.env.TOKEN_KEY;

    if (!secretKey) {
        throw new Error('TOKEN_KEY is not defined in the environment variables');
    }

    return jwt.sign( { id }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    })

};