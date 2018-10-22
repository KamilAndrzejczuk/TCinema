const mongoose = require('mongoose');
const config = require('../config/database');
const Movie = require('./movie');
const Seat = require('./seat');

const SeanceSchema = mongoose.Schema({
    dates: {
        type: [Date],
        required: true,
    },
    movie: {
        type: String,
        required: true,
    },
    seats: {
        type: Array,
        required: true,
    },
    roomID:{
        type: String,
        required: true,
    },
});

const Seance = module.exports = mongoose.model("Seance", SeanceSchema);

module.exports.addSeance = function (newSeance, callback) {
    newSeance.save(callback);
};

module.exports.removeSeance = function (seanceID, callback) {
    Seance.findByIdAndRemove(seanceID, callback);
};
