const express = require('express');
const mongoose = require('mongoose');

// App
const app = express();

//DB setup
mongoose.connect("mongodb://mongo:27017");

// Routers
const category = require('./routes/category');


//Define paths
app.use('/categories', category);

app.listen(80, function(){
 console.log('Example app listening on port 80!');
});
