// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var City = new Schema({
    name: String
});

var Country = new Schema({
  name: String,
  code: String,
  continent: String,
  cities: [City]
});

module.exports = mongoose.model('Country', Country);
