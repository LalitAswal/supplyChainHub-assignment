const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const JWT_SECRET =  process.env.JWT_SECRET; 

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET, 
        { expiresIn: '1h' }
    );
};

const verifyToken = (token) => {
    console.log('token', token)
    console.log('jwt',JWT_SECRET)
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
