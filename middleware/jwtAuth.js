const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const jwtAuth = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token
        jwt.verify(token, "aryan123", async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            } else {
                // Get user data from the decoded token (payload)
                const user = await User.findById(decoded.userId);

                // Attach user data to the request object
                req.user = user;

                // Call the next middleware
                next();
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = jwtAuth;
