var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../auth');

router.get('/:id', auth.isAuthenticated, function(req, res, next) {
  models.Checkout.findAll({
    where: { VisitorId: req.params.id },
    order: [['createdAt', 'DESC']]
  }).then(function(checkout) {
    res.json(checkout);
  });
});

router.post('/', auth.isAuthenticated, function(req, res, next) {
	models.Checkout
    .findOrCreate({
      where: {
        startDate: req.body.startDate
      },
      defaults: req.body})
    .spread(function(checkout, created) {
      res.json(checkout);
    });
});

router.put('/:id', auth.isAuthenticated, function(req, res, next) {
  models.Checkout
  .findOne({ where : { id: req.params.id } })
  .then(function(checkout) {
    checkout.update(req.body, { fields: ['endDate', 'comment'] })
      .then(function(checkout) {
        res.json(checkout);
      });
  });
});


module.exports = router;
