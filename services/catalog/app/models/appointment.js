// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Appointment = new Schema({
  name: String,
  description: String,
  time: Number,
  service: String
});

module.exports = mongoose.model('Appointment', Appointment);
