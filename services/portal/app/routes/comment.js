var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../auth');

router.get('/:id', auth.isAuthenticated, function(req, res, next) {
  console.log(req.params.id);
  models.Comment.findAll({
    where: { VisitorId: req.params.id },
    order: [['createdAt', 'DESC']]
  }).then(function(comments) {
    res.json(comments);
  });
});

router.post('/', auth.isAuthenticated, function(req, res, next) {
  console.log(req.body);
	models.Comment
    .findOrCreate({
      where: {
        comment: req.body.comment
      },
      defaults: req.body})
    .spread(function(visitor, created) {
      res.json(visitor);
    });
});


module.exports = router;
