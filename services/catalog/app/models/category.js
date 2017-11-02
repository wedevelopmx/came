// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = new Schema({
    name: String,
    description: String
});

var Category = new Schema({
  name: String,
  description: String,
  entries: [Entry]
});

module.exports = mongoose.model('Category', Category);
