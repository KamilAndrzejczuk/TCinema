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
    console.log(req.body);
    
    for (let d = 0; d < req.body.dates.length; d++) {
        for (let i = 1; i <= req.body.room.rows; i++) {
            for (let j = 1; j <= req.body.room.columns; j++) {
                newSeats.push(new Seat({ date: req.body.dates[d], row: i, column: j }));
            }
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
            Seat.addMany(newSeats, (e, seats) => {
                if (e) {
                    res.json({
                        success: false,
                        message: "An error occured while adding seats: " + e,
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Added new seance",
                        seance: seance,
                        seats: seats
                    });
                }
            })
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

router.put('/update', (req, res) => {
    let query = { 'seances._id': req.body.seanceId }
    Seance.findOneAndUpdate(query, { $set: { "seances.&.seats._id": req.body.seatId } }, (err, doc, ress) => {
        if (err) {
            res.json({
                message: "error: " + err,
                success: false,
            })
        } else {
            res.json({
                success: true,
                message: doc, ress
            });
        }
    })
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