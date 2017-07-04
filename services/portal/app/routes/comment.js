var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  models.Comment.findAll({
    where: { VisitorId: req.params.id },
    order: [['createdAt', 'DESC']]
  }).then(function(comments) {
    res.json(comments);
  });
});

router.post('/', function(req, res, next) {
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
