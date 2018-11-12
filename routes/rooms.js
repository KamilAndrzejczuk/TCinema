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
        } else {
            res.json({
                message: "Succesfully added new room",
                success: true,
                roomId: done._id,
            });
        }
    });
});

router.post('/getRoom', (req, res) => {
    Room.getRoom(req.body.roomID, (err, room) => {
        if (err || !room) {
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


router.get('/getRooms', (req, res) => {
    Room.getRooms((err, rooms) => {
        if (err) {
            res.json({
                message: "An error occured while trying to fetch data " + err,
                success: false
            });
        } else {
            res.json({
                rooms: rooms
            });
        }
    })
})

router.delete(`/remove`, (req, res) => {
    Room.findOneAndDelete({number: req.body.number }, (err, resp) => {
        if (err && !resp) {
            res.json({
                message: "An error occured while trying to fetch data " + err,
                success: false
            });
        }else {
            res.json({
                success: true,
                message: "Room deleted",
            });
        }
    })
})

module.exports = router;