const mongoose = require('mongoose');
const config = require('../config/database');
const Movie = require('../models/movie');
const Seance = require('../models/seance')
const Room = require('../models/room');
const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
    let rm;
    Room.getRoom(req.body.roomID, (err, room) => {
        if (err) {
            res.json({
                success: false,
                message: "An error ocurred while finding room, try again",
            });

        };
        let newSeats = [];
        for (let i = 1; i <= room.columns; i++) {
            for (let j = 1; j <= room.rows; j++) {
                newSeats.push({
                    isReserved: false,
                    column: j,
                    row: i
                });
            }
        }
        const newSeance = new Seance({
            dates: req.body.dates.map((el => new Date(el))),
            movie: req.body.movieID,
            roomID: req.body.roomID,
            seats: newSeats,
        });
        Seance.addSeance(newSeance, (err, seance) => {
            if(err){
                res.json({
                    success: false,
                    message: "An error occured while adding new seance",
                });
            }
            res.json({
                success: true,
                message: "Added new seance"
            });
        });
    });

});

module.exports = router;