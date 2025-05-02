require('dotenv').config();
const jwt = require('jsonwebtoken');
const redis = require('../config/redis'); // Ensure Redis connection

exports.verifyToken = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: "Authorization token required" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Validate session in Redis
        const validSession = await redis.sismemberAsync(
            `user:${decoded.userId}:sessions`, 
            decoded.sessionId
        );

        if (!validSession) {
            return res.status(401).json({ error: "Session expired or invalid" });
        }

        // Attach user and session to request
        req.user = {
            userId: decoded.userId,
            sessionId: decoded.sessionId
        };

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        
        const response = {
            error: "Authentication failed",
            details: "Invalid or expired token"
        };

        if (error instanceof jwt.TokenExpiredError) {
            response.details = "Token expired";
        } else if (error instanceof jwt.JsonWebTokenError) {
            response.details = "Invalid token";
        }

        res.status(401).json(response);
    }
};