// controller/modelController.js

const path = require('path');
const express = require('express');
const router = express.Router();
const { PythonShell } = require('python-shell');
const fs = require('fs');

// Load the PyTorch model
const modelPath = path.join(__dirname, '../models/yolov8n_custom.pt');

// Define prediction function
function predict(req, res) {
    const imageData = req.body.imageData; // Adjust this based on your client-side implementation

    // Save the image data to a temporary file
    const imagePath = path.join(__dirname, '../temp/image.jpg');
    fs.writeFileSync(imagePath, imageData);

    // Call Python script to perform inference
    const options = {
        mode: 'text',
        pythonOptions: ['-W', 'ignore'],
        scriptPath: path.join(__dirname, '../'),
        args: [imagePath, modelPath]
    };

    PythonShell.run('../inference.py', options, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred during inference.' });
        } else {
            const output = JSON.parse(result[0]);
            res.json({ result: output });
        }
    });
}

module.exports = {
    predict
};
