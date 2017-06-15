var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:supportId', function(req, res, next) {
  models.Appointment.findAll({
    where: { SupportId: req.params.supportId },
    order: [['createdAt', 'DESC']]
  }).then(function(appointments) {
    res.json(appointments);
  });
});

router.post('/', function(req, res, next) {
	models.Appointment
    .findOrCreate({
      where: {
        startDate: req.body.startDate
      },
      defaults: req.body})
    .spread(function(appointment, created) {
      res.json(appointment);
    });
});

router.put('/:id', function(req, res, next) {
  models.Appointment
  .findOne({ where : { id: req.params.id } })
  .then(function(appointment) {
    appointment.update(req.body, { fields: ['endDate', 'duration', 'comment'] })
      .then(function(appointment) {
        res.json(appointment);
      });
  });
});


module.exports = router;
