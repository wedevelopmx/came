var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../auth');

router.get('/', auth.isAuthenticated, function(req, res, next) {
  models.Service.findAll().then(function(services) {
    res.json(services);
  });
});
router.post('/', auth.isAuthenticated, function(req, res, next) {
	console.log(req.body);
	models.Service
      .findOrCreate({
        where: { name: req.body.name },
        defaults: req.body})
      .spread(function(service, created) {
        console.log(service.get({
          plain: true
        }))
        res.json(service);
      });
});

module.exports = router;
