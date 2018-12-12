const config = require('../config/database');
const express = require('express');
const router = express.Router();
const Seat = require('../models/seat');
const mongoose = require('mongoose');

router.post('/reserve', (req, res) => {
    
    console.log(req.body);
    Seat.reserveSeat({seats: req.body.seats, personInfo: req.body.personInfo}, (err, done) => {
        if (err) {
            res.json({
                msg: "Failed to reserve seats",
                success: false,
            });
        } else {
            res.json({
                msg: "Reservation has done: " + done,
                success: true,
            });
        }
    });
});

router.post('/getseats', (req, res) => {
    
    Seat.find({ _id: {$in: req.body.seats} }, (err, seats) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching seats: " + err,
            })
        } else {
            res.json({
                success: true,
                message: "Seats fetched",
                seats: seats
            })
        }
    })
})

router.get('/all', (req, res) => {
    Seat.find({}, (err, seats) => {
        if (err) {
            res.json({
                success: false,
                message: "An error occured while fetching seats",
            })
        } else {
            res.json({
                success: true,
                message: "Seats fetched",
                seats: seats
            })
        }
    })
})

module.exports = router;

