var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../auth');

router.get('/', function(req, res, next) {
  var queryString =
  "select v.firstName, v.lastName, sv.name as serviceName, sv.resource as serviceResource, a.reason, a.startDate, a.scheduleEndDate from Visitors v join Supports s on s.VisitorId = v.id join Services sv on s.ServiceId = sv.id join Appointments a on a.SupportId = s.id and DATE_FORMAT(a.startDate, '%Y-%m-%d') = :startDate";
  var startDate = req.query.startDate;

  models.sequelize
  .query(queryString, {
    replacements: { startDate: startDate },
    type: models.sequelize.QueryTypes.SELECT
  })
  .then(function(support) {
    res.json(support);
  });
});

router.get('/:supportId', auth.isAuthenticated, function(req, res, next) {
  models.Appointment.findAll({
    where: { SupportId: req.params.supportId },
    order: [['createdAt', 'DESC']]
  }).then(function(appointments) {
    res.json(appointments);
  });
});

router.post('/', auth.isAuthenticated, function(req, res, next) {
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

router.put('/:id', auth.isAuthenticated, function(req, res, next) {
  models.Appointment
  .findOne({ where : { id: req.params.id } })
  .then(function(appointment) {
    appointment.update(req.body, { fields: ['endDate', 'scheduleEndDate', 'comment'] })
      .then(function(appointment) {
        res.json(appointment);
      });
  });
});


module.exports = router;
