var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  models.Visitor.findOne({
    attributes: ['id'],
    where: { id: req.params.id },
    include: [{
      attributes: ['id', 'name', 'description', 'resource'],
      model: models.Service,
      as: 'services',
      through: {
        attributes: ['startDate', 'interview', 'psychological', 'interviewComment', 'psychologicalComment'],
        model: models.Support
      }
    }],
    order: [['createdAt', 'DESC']]
  }).then(function(visitor) {
    res.json(visitor.get({ plain: true}).services);
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
	models.Support
    .findOrCreate({
      where: {
        VisitorId: req.body.VisitorId,
        ServiceId: req.body.ServiceId
      },
      defaults: req.body})
    .spread(function(support, created) {
      models.Visitor.findOne({
        attributes: ['id'],
        where: { id: support.VisitorId },
        include: [{
          attributes: ['id', 'name', 'description', 'resource'],
          model: models.Service,
          as: 'services',
          through: {
            attributes: ['startDate', 'interview', 'psychological', 'interviewComment', 'psychologicalComment'],
            model: models.Support
          },
          where: { id: support.ServiceId }
        }],
        order: [['createdAt', 'DESC']]
      }).then(function(visitor) {
        res.json(visitor.get({ plain: true}).services[0]);
      });
    });
});


module.exports = router;
