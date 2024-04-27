const express = require('express');
const router = express.Router();
const Report = require('../model/reportModel');

// Route to fetch all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a new report
router.post('/', async (req, res) => {
    const { bladeguard, apron, rivingKnife, eyeglasses, pushStick, speedOfBlade, angleOfBlade, heightOfBlade } = req.body;
    try {
        const newReport = new Report({ bladeguard, apron, rivingKnife, eyeglasses, pushStick, speedOfBlade, angleOfBlade, heightOfBlade });
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
