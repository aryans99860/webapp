// models/reportModel.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    bladeguard: String,
    apron: String,
    rivingKnife: String,
    eyeglasses: String,
    pushStick: String,
    speedOfBlade: Number,
    angleOfBlade: Number,
    heightOfBlade: Number
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
