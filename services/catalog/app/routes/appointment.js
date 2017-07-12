const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

router.get('/', function(req, res, next) {
  const { service } = req.query;
  const constrain = service ? { service } : {};

  // get all the users
  Appointment.find(constrain, { _id: 1, name: 1, description: 1, time: 1, service: 1 } , function(err, appointments) {
    if (err) throw err;
    res.json(appointments);
  });
});

router.get('/:id', function(req, res, next) {
  // get all the users
  Category.findOne({ _id: req.params.id }, { _id: 1, name: 1, description: 1, time: 1 } , function(err, appointment) {
    res.json(appointment);
  });
});

module.exports = router;
