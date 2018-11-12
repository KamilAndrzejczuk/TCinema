const mongoose = require('mongoose');
const config = require('../config/database');

const SeatSchema = mongoose.Schema({
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

module.exports.reserveSeat = function (r,c, callback) {
    Seat.findOneAndUpdate({ row: r, column: c}, { isReserved: true }, callback);
};

