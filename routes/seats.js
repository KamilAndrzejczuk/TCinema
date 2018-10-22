const config = require('../config/database');
const express = require('express');
const router = express.Router();
const Seat = require('../models/seat');

router.post('/reserveSeat', (req, res) => {
    Seat.reserveSeat(req.body.num,(err, done) => {
        if(err) {
            res.json({
                msg: "Failed to reserve seats",
                success: false,
            });
        }else{
        res.json({
            msg: "Reservation has done",
            success: true,
        });
    }});
 });

module.exports = router;