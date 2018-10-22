const config = require('../config/database');
const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    columns:{
        type: Number,
        required: true,
    },
    rows: {
        type: Number,
        required: true,
    },
});

const Room = module.exports = mongoose.model("Room", roomSchema);

module.exports.getRoom = function(roomID, callback){
    Room.findById(roomID, callback);
};

module.exports.addRoom = function(newRoom, callback){
    newRoom.save(callback);
};

module.exports.removeRoom = function(roomID, callback){
    Room.findByIdAndDelete(roomID, callback);
};