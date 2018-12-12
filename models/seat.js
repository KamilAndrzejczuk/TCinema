const mongoose = require('mongoose');
const config = require('../config/database');

const SeatSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    row: {
        type: Number,
        required: true
    }, 
    column: {
        type: Number,
        required: true
    },
    isReserved: {
        type: Boolean,
        default: false
    },
});

const Seat = module.exports = mongoose.model("Seat", SeatSchema);

module.exports.reserveSeat = function ({seats, personInfo}, callback) {
    Seat.updateMany({_id: {$in: seats}},{isReserved: true, personInfo: personInfo}, callback);
};

module.exports.addMany = function (seatsArr, callback) {
    Seat.insertMany(seatsArr, callback);
}


