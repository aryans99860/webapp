const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


// Controller for user signup
const signupController = async (req, res) => {
    try {
        const { name, username, password, email, isSupervisor } = req.body;
        

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Create new user instance
        const newUser = new User({
            name: name,
            username: username,
            password: password,
            email: email,
            isSupervisor: isSupervisor
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// login equivalence function
function equivalence(a, b) {
    return a === b;
}


// Controller for user login
// Controller for user login
const loginController = async (req, res) => {
    try {
        const { username, password, isSupervisor } = req.body;

        // Find user by username and password
        const user = await User.findOne({ username, password });

        // If user is not found
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, isSupervisor: user.isSupervisor },
            "aryan123",
            { expiresIn: '1h' } // Expiration time 1 hour
        );

        // Response object
        const response = {
            isSupervisor,
            message: "Login successful",
            token: token // Include token in response
        };

        if (equivalence(user.isSupervisor, isSupervisor)) {
            return res.status(200).json(response);
        } else {
            response.message = "Unauthorised";
            response.isSupervisor = undefined;
            return res.status(200).json(response);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {loginController , signupController};

