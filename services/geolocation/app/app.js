const express = require('express');
const mongoose = require('mongoose');

// App
const app = express();

//DB setup
mongoose.connect("mongodb://mongo:27017");

// Routers
const location = require('./routes/location');

//Define paths
app.use('/countries', location);

app.listen(80, function(){
 console.log('Geolocation API listening port 80!');
});
