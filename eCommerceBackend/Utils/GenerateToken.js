require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    generateAccessToken: (userId, sessionId) => {
        return jwt.sign(
            { userId, sessionId },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXP }
        );
    },

    generateRefreshToken: (userId, sessionId) => {
        return jwt.sign(
            { userId, sessionId },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXP }
        );
    },

    generatePasswordResetToken: (userId) => {
        return jwt.sign(
            { userId },
            process.env.JWT_RESET_SECRET, // Separate secret for password reset
            { expiresIn: process.env.PASSWORD_RESET_EXP || '15m' }
        );
    }
};