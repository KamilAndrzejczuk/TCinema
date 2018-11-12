const mongoose = require('mongoose');
const config = require('../config/database');
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.post('/add', (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        productionYear: req.body.productionYear,
        director: req.body.director
    });

    Movie.addMovie(newMovie, (err, movie) => {
        if (err) {
            res.json({
                success: false,
                msg: "An error occured while adding new movie, try again"
            });
        } else {
            res.json({
                success: true,
                msg: "New Movie added to the database",
                movieId: movie._id,
            });
        }
    })
});

router.get('/all', (req, res) => {
    Movie.find({}, (err, movies) => {
        if (err || !movies) {
            res.json({
                message: "An error occured while fetching movies, try again",
                success: false
            })
        }
        else {
            res.json({
                message: "data fetched",
                success: true,
                movies: movies
            });
        }
    })
});

router.delete('/remove', (req, res) => {
    Movie.removeMovie(req.body.id, (err, removed) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while removing movie, try again"
            });
        } else {
            res.json({
                message: "Movie removed",
                success: true
            });
        }
    })
});

module.exports = router;