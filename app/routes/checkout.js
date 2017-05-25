var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', function(req, res, next) {
  models.Checkout.findAll({
    where: { VisitorId: req.params.id },
    order: [['createdAt', 'DESC']]
  }).then(function(comments) {
    res.json(comments);
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
	models.Checkout
    .findOrCreate({
      where: {
        startDate: req.body.startDate
      },
      defaults: req.body})
    .spread(function(visitor, created) {
      res.json(visitor);
    });
});


module.exports = router;
