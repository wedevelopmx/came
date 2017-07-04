const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', function(req, res, next) {
  // get all the users
  Category.find({}, { name: 1, entries: 1, "entries.name": 1 } , function(err, categories) {
    if (err) throw err;
    // object of all the categories
    const hash = {};
    categories.forEach((category) => {
      hash[category.name] = category.entries.map((entry) => {
        return entry.name;
      });
    });

    res.json(hash);
  });
});

router.get('/:id', function(req, res, next) {
  // get all the users
  Category.findOne({ _id: req.params.id }, { entries: 1, "entries.name": 1 } , function(err, category) {
    if (err) throw err;
    // object of all the category
    const entries = category.entries.map((entry) => {
      return entry.name;
    });

    res.json(entries);
  });
});

module.exports = router;
