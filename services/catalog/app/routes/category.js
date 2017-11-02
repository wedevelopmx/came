const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', function(req, res, next) {
  const plain = req.query.plain ? req.query.plain == 'true' : true;
  // get all the users
  Category.find({}, { name: 1, entries: 1, "entries.name": 1, "entries._id": 1, "entries.description": 1 } , function(err, categories) {
    if (err) throw err;
    // object of all the categories
    if(!plain) {
      res.json(categories);
    } else {
      const hash = {};
      categories.forEach((category) => {
        hash[category.name] = category.entries.map((entry) => {
          return entry.name;
        });
      });

      res.json(hash);
    }
  });
});

router.put('/:id/entry', function(req, res, next) {
  // get all the users
  Category.update(
    { _id: req.params.id, "entries._id": req.body._id },
    { $set: { "entries.$": {name: req.body.name, description: req.body.description} } } ,
    function(err, category) {
      if (err) throw err;
      Category.findOne({ _id: req.params.id }, { name: 1, entries: 1, "entries.name": 1, "entries._id": 1, "entries.description": 1 } , function(err, category) {
        if (err) throw err;
        res.json(category);
      });
  });
});

router.post('/:id/entry', function(req, res, next) {
  // get all the users
  Category.update({ _id: req.params.id}, { $addToSet: { entries: req.body} }, function(err, category) {
      if (err) throw err;
      Category.findOne({ _id: req.params.id }, { name: 1, entries: 1, "entries.name": 1, "entries._id": 1, "entries.description": 1 } , function(err, category) {
        if (err) throw err;
        res.json(category);
      });
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
