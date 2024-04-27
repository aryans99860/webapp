// controllers/reportController.js
const Report = require('../model/reportModel');

exports.addReport = async (req, res) => {
    try{
        const { bladegaurd, apron, rivingKnife, eyeglasses, pushStick, speedOfBlade, angleOfBlade, heightOfBlade } = req.body;
        const newReport = new Report({
            bladegaurd,
            apron,
            rivingKnife,
            eyeglasses,
            pushStick,
            speedOfBlade,
            angleOfBlade,
            heightOfBlade
        });
        await newReport.save();
        res.status(201).send('Report added successfully');
    }catch (error) {
        console.error(error);
        res.status(500).send('Error adding report');
    }
};
