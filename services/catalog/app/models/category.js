// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Entry = new Schema({
    name: String,
    description: String,
    data: String
});

var Category = new Schema({
  name: String,
  description: String,
  dataType: String,
  entries: [Entry]
});

module.exports = mongoose.model('Category', Category);
