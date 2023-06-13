const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if(!req.user)
            throw new Error("Not a real user or user doesn't exist");
        next();
    } catch (error) {
        throw new Error('Not authorized to access this route');
    }

}

module.exports = { generateToken, authenticationMiddleware };