const mongoose = require('mongoose');
const categories = require('./data/categories');
const appointments = require('./data/appointments');
const Category = require('../models/category');
const Appointment = require('../models/appointment');

//DB setup
mongoose.connect("mongodb://mongo:27017/came");

categories.forEach((data) => {
  Category.findOneAndUpdate({ 'name' : data.name }, data , { upsert: true }, () => { console.log(`Category ${data.name} saved successfully!`); });
});

appointments.forEach((data) => {
  Appointment.findOneAndUpdate({ 'name' : data.name }, data , { upsert: true }, () => { console.log(`Appointment ${data.name} saved successfully!`); });
});
