const mongoose = require('mongoose');
const config = require('../config/database');

const SeatSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    isReserved:{
        type: Boolean,
        defauld: false
    },
});

const Seat = module.exports = mongoose.model("Seat",SeatSchema);

module.exports.reserveSeat = function(num, callback){
    Seat.findOneAndUpdate({number: num},{isReserved: true},callback);
};

