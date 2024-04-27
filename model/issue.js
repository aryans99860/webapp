const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: String,
    details: String
});

module.exports = mongoose.model('issue', issueSchema);
