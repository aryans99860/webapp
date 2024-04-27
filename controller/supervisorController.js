// controllers/userController.js

const User = require('../model/userModel');

// Controller function to fetch operator names
exports.getOperators = async (req, res) => {
    try {
        // Query the database for users where isSupervisor is false
        const operators = await User.find({ isSupervisor: false }, 'name');
        res.json(operators);
    } catch (error) {
        console.error('Error fetching operators:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
