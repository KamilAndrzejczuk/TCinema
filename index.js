const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database');

const usersRoute = require('./routes/users');
const seanceRoute = require('./routes/seances');
const seatsRoute = require('./routes/seats');
const movieRoute = require('./routes/movies');
const roomsRoute = require('./routes/rooms');
const reservationRoute = require('./routes/reservations');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log("Connected succesfully to the database");
});

mongoose.connection.on('error', (err) => {
    console.log("An error occured with database: " + err);
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
const port = 8080;


app.listen(port, () => {
    console.log("server listening on port " + port);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Pusto");
})

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/seance', seanceRoute);
app.use('/users', usersRoute);
app.use('/movie', movieRoute);
app.use('/seats', seatsRoute);
app.use('/room', roomsRoute);
app.use('/reservation', reservationRoute);

var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}

app.use(cors(corsOptions));