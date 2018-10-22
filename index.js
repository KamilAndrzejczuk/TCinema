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
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log("Connected succesfully to the database");
});

mongoose.connection.on('error', (err) => {
    console.log("An error occured with database: " + err);
});

const app = express();
const port = 3000;

app.use(cors());

app.listen(port,() => {
    console.log("server listening on port " + port);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res) => {
res.send("Pusto");
})

// dzieki temu moge brac templatki w formacie .json
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/seance', seanceRoute);
app.use('/users', usersRoute);
app.use('/movie', movieRoute);
app.use('/seats', seatsRoute);
app.use('/room', roomsRoute);
// dzieki temu moge uzywac post get itp na jednym adresie!

