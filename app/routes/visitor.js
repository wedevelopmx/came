var express = require('express');
var router = express.Router();
var models = require('../models');
var path = require('path');
var config = require('../config')
var Storage = require('../modules/storage');

var storage = new Storage(config);

router.get('/', function(req, res, next) {
  models.Visitor.findAll().then(function(visitors) {
    res.json(visitors);
  });
});

router.get('/:id', function(req, res, next) {
  models.Visitor
    .findOne({
      where: { id: req.params.id }
    })
    .then(function(visitor) {
      visitor = visitor.get({ plain: true });
      res.json(visitor);
    });
});

router.put('/:id', function(req, res, next) {
  models.Visitor
  .findOne({ where : { id: req.params.id } })
  .then(function(visitor) {
    visitor.update(req.body, { fields: ['firstName', 'lastName', 'location', 'birthDate'] })
      .then(function(visitor) {
        res.json(visitor);
      });
  });
});

router.post('/', function(req, res, next) {
	models.Visitor
      .findOrCreate({
        where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          secondSurename: req.body.secondSurename,
        },
        defaults: req.body})
      .spread(function(visitor, created) {
        var avatar = `profile${visitor.id}.png`;
        storage.storeb64(avatar, req.body.profilePic);

        res.json(visitor);
      });
});

router.get('/:id/avatar', function(req, res){
  var avatar = `profile${req.params.id}.png`;
  var file = path.join(__dirname, '../../storage'+ '/' + avatar);
  console.log(file);
  res.sendFile(file);
});


module.exports = router;
