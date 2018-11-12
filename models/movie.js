const mongoose = require('mongoose');
const config = require('../config/database');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    productionYear: {
        type: Date,
        required: true,
    },
    director:{
        type: String,
        required: true,
    },
});

const Movie = module.exports = mongoose.model('Movie', MovieSchema);

module.exports.addMovie = function(newMovie, callback){
    newMovie.save(callback);
};

module.exports.removeMovie = function(movieId, callback){
    Movie.findByIdAndDelete(movieId, callback);
};