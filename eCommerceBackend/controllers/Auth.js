const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { sanitizeUser } = require("../utils/SanitizeUser");
const { generateAccessToken, generateRefreshToken } = require("../utils/GenerateToken");
const redis = require('../config/redis');

exports.signup = async (req, res) => {
    try {
        // Validate input
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check existing user
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        
        // Create user
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        });

        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Store refresh token in Redis (7 days)
        await redis.setEx(
            `refresh:${newUser._id}:${req.sessionID}`,
            process.env.REFRESH_TOKEN_EXP_DAYS * 24 * 60 * 60,
            refreshToken
        );

        // Set secure cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.PRODUCTION,
            sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax',
            maxAge: process.env.ACCESS_TOKEN_EXP_MS
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.PRODUCTION ,
            sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax',
            maxAge: process.env.REFRESH_TOKEN_EXP_MS
        });

        res.status(201).json(sanitizeUser(newUser));

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

exports.login = async (req, res) => {
    try {
        // Validate input
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate new tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in Redis
        const storeTokenInRedis = async (key, value, expirationInSeconds) => {
            try {
              await redisClient.setEx(key, expirationInSeconds, value);
              console.log(`🔐 Token stored in Redis with key: ${key}`);
            } catch (err) {
              console.error('❌ Failed to store token in Redis:', err);
            }
          };

        // Set cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.PRODUCTION === 'true',
            sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax',
            maxAge: process.env.ACCESS_TOKEN_EXP_MS
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.PRODUCTION,
            sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax',
            maxAge: process.env.REFRESH_TOKEN_EXP_MS
        });

        res.status(200).json(sanitizeUser(user));

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: "Server error during login" });
    }
};

exports.logout = async (req, res) => {
    try {
        // Clear refresh token from Redis
        await redis.del(`refresh:${req.user._id}:${req.sessionID}`);

        // Clear cookies
        res.clearCookie('accessToken', {
            secure: process.env.PRODUCTION === 'true',
            sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax'
        });

        res.clearCookie('refreshToken', {
            secure: process.env.PRODUCTION === 'true',
            sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax'
        });

        // Destroy session
        req.session.destroy(() => {
            res.status(200).json({ message: 'Logout successful' });
        });

    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

exports.checkAuth = async (req, res) => {
    try {
        // Verify access token from middleware
        const user = await User.findById(req.user._id);
        if (!user) return res.status(401).json({ message: "User not found" });

        // Verify refresh token exists in Redis
        const storedRefresh = await redis.get(`refresh:${user._id}:${req.sessionID}`);
        if (!storedRefresh) {
            return res.status(401).json({ message: "Session expired" });
        }

        res.status(200).json(sanitizeUser(user));
    } catch (error) {
        console.error('Auth Check Error:', error);
        res.status(500).json({ message: "Authentication verification failed" });
    }
};