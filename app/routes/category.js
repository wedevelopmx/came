var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  models.Category.findAll().then(function(category) {
    res.json(category);
  });
});

router.get('/:id', function(req, res, next) {
  models.Category
    .findOne({
      attributes: ['id', 'name', 'description'],
      where: { id: req.params.id },
      include: [{
        attributes: ['id', 'name', 'description'],
        model: models.CategoryEntry,
        as: 'entries'
      }]
    })
    .then(function(category) {
      res.json(category);
    });
});

router.post('/', function(req, res, next) {
	models.Category
      .findOrCreate({
        where: { name: req.body.name },
        defaults: req.body})
      .spread(function(category, created) {
        res.json(category);
      });
});

router.post('/:id/entry', function(req, res, next) {
  var entry = req.body;
  entry.CategoryId = req.params.id;
  console.log(entry);
	models.CategoryEntry
      .findOrCreate({
        where: { name: req.body.name },
        defaults: req.body})
      .spread(function(category, created) {
        res.json(category);
      });
});


module.exports = router;
