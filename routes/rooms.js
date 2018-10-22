const mongoose = require('mongoose');
const config = require('../config/database');
const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.post('/add', (req, res) => {
    const newRoom = new Room({
        number: req.body.number,
        columns: req.body.columns,
        rows: req.body.rows,
    });
    Room.addRoom(newRoom, (err, done) => {
        if (err) {
            res.json({
                message: "An error occured while adding new room, try again",
                success: false,
            });
        }
        res.json({
            message: "Succesfully added new room",
            success: true,

        });
    });
});

router.post('/getRoom', (req, res) => {
    Room.getRoom(req.body.roomID, (err, room) => {
        if (err || !room ) {
            res.json({
                message: "An error occured while trying to fetch room data, try again",
                success: false,
            });
        }
        res.json({
            room: room
        });
    });
});

module.exports = router;