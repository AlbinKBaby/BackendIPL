const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
    wk: {
        type: String,
        required: true,
    },
    home: {
        type: String,
        required: true,
    },
    baseprice: {
        type: Number,
        required: true,
    },
    matches: {
        type: Number,
        required: true,
    },
    runs: {
        type: Number,
        required: false,
    },
    wickets: {
        type: Number,
        required: false,
    },
    photo: {
        type: String,
        required: false,
    },


});

const players = mongoose.model('players', playerSchema)
module.exports = players;