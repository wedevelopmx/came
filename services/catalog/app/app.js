const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// App
const app = express();

//DB setup
mongoose.connect("mongodb://mongo:27017/came");

// Routers
const category = require('./routes/category');
const appointment = require('./routes/appointment');

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//Define paths
app.use('/categories', category);
app.use('/appointments', appointment);

app.listen(80, function(){
 console.log('Example app listening on port 80!');
});
