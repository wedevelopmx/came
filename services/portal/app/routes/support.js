var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  var queryString =
  "select s.id, sv.id as serviceId, sv.name, sv.description, sv.resource, sv.appointmentCatalog, s.startDate, s.interview, s.psychological, s.interviewComment, s.psychologicalComment from Services sv join Supports s on sv.id = s.ServiceId and s.VisitorId = :visitorId";

  models.sequelize
  .query(queryString, {
    replacements: { visitorId: req.params.id },
    type: models.sequelize.QueryTypes.SELECT
  })
  .then(function(support) {
    res.json(support);
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

      var queryString =
      "select s.id, sv.id as serviceId, sv.name, sv.description, sv.resource, sv.appointmentCatalog, s.startDate, s.interview, s.psychological, s.interviewComment, s.psychologicalComment from Services sv join Supports s on sv.id = s.ServiceId and s.id = :supportId limit 1";

      models.sequelize
      .query(queryString, {
        replacements: { supportId: support.id },
        type: models.sequelize.QueryTypes.SELECT
      })
      .then(function(support) {
        if(support.length > 0)
          res.json(support[0]);
        else
          res.status(404);
      });
    });
});

module.exports = router;
