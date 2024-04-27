const Issue = require('../model/issue');

exports.submitIssue = async (req, res) => {
    try {
        const { title, details } = req.body;
        const newIssue = new Issue({ title, details });
        await newIssue.save();
        res.status(200).send('Issue submitted successfully');
    } catch (error) {
        console.error('Error submitting issue:', error);
        res.status(500).send('Internal Server Error');
    }
};
