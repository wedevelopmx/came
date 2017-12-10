var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../auth');

router.get('/:id', auth.isAuthenticated, function(req, res, next) {
  models.Comment.findAll({
    where: { VisitorId: req.params.id },
    order: [['createdAt', 'DESC']]
  }).then(function(comments) {
    res.json(comments);
  });
});

router.post('/', auth.isAuthenticated, function(req, res, next) {
	models.Comment
    .findOrCreate({
      where: { comment: req.body.comment },
      defaults: req.body})
    .spread(function(comment, created) {
      var conditions = {id: req.body.VisitorId };
      
      if(req.body.type !== 'danger')
        conditions.alert = { $ne: 'danger' };
      
      models.Visitor.update({ alert: req.body.type}, { where: { $and: conditions } });
      
      res.json(comment);
    });
});


module.exports = router;
