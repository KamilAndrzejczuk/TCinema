const mongoose = require('mongoose');
const config = require('../config/database');
const Movie = require('./movie');
const Room = require("./room");
const SeanceSchema = mongoose.Schema({
    dates: {
        type: [Date],
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie',
        required: true
    },
    seats: [{
        type: mongoose.Schema.Types.Mixed, ref: 'Seat',
        required: true,
    }],
    room: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Room',
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

module.exports.removeSeances = function( seancesID, callback){
    console.log(seancesID);
    Seance.deleteMany({ id: { $in: seancesID } }, callback);        
}
