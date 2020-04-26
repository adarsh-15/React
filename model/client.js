const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const client = new Schema({
    name: String,
    email: String,
    mobileno: Number,
    comments: String
});

module.exports = mongoose.model('Client', client); 