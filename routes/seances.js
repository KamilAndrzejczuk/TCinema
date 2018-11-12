const mongoose = require('mongoose');
const config = require('../config/database');
const Movie = require('../models/movie');
const Seance = require('../models/seance')
const Room = require('../models/room');
const express = require('express');
const router = express.Router();
const Seat = require('../models/seat')

router.post('/remove', (req, res) => {
    Seance.findByIdAndDelete(req.body.seanceId, (err, deleted) => {
        if (err) {
            res.json({
                msg: "err " + err
            })
        } else {
            res.json({
                success: true,
                deleted: deleted
            })
        }
    })
})

router.post('/add', (req, res) => {

    let newSeats = [];
    for (let i = 1; i <= req.body.room.rows; i++) {
        for (let j = 1; j <= req.body.room.columns; j++) {
            newSeats.push(new Seat({ row: i, column: j }));
        }
    }
    const newSeance = new Seance({
        dates: req.body.dates,
        movie: req.body.movie.id,
        room: req.body.room.id,
        seats: newSeats
    });
    Seance.addSeance(newSeance, (err, seance) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while adding new seance: " + err,
            });
        } else {
            res.json({
                success: true,
                message: "Added new seance",
                seance: seance
            });
        }
    });

});

router.delete('/remove', (req, res) => {
    Seance.removeSeances(req.body.seances, (err) => {
        if (err) {
            res.json({
                message: "error: " + err,
                success: false,
            })
        } else {
            res.json({
                success: true,
                message: "All seances removed"
            });
        };
    });
});
router.get('/all', (req, res) => {
    Seance.find({}, (err, seances) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while adding new seance",
            })
        } else {
            res.json({
                success: true,
                message: "Seances fetched",
                seances: seances
            })
        }
    })
})

module.exports = router;