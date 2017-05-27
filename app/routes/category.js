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

router.get('/:id/entries', function(req, res, next) {
  models.CategoryEntry
    .findAll({
      attributes: ['id', 'name', 'description', 'CategoryId'],
      where: { CategoryId: req.params.id }
    })
    .then(function(entries) {
      res.json(entries);
    });
});


router.post('/:id/entry', function(req, res, next) {
  var entry = req.body;
  if(req.params.id == entry.CategoryId) {
    models.CategoryEntry
        .findOrCreate({
          where: { id: req.body.id, CategoryId: req.params.id },
          defaults: req.body})
        .spread(function(category, created) {
          res.json(category);
        });
  } else {
    res.status(400).json({ error: 'You are trying to save a entity with different parent'});
  }
});

router.put('/:id/entry', function(req, res, next) {
  var entry = req.body;
  if(req.params.id == entry.CategoryId) {
    models.CategoryEntry
      .find({
        where: { id: req.body.id, CategoryId: req.params.id }
      })
      .then(function(entity) {
        if (entity) {
          entity.updateAttributes(req.body)
          .then(function (entity) {
            res.json(entity);
          });
        }
      });
  } else {
    res.status(400).json({ error: 'You are trying to save a entity with different parent'});
  }
});


module.exports = router;
