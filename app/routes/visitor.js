var express = require('express');
var router = express.Router();
var models = require('../models');
var path = require('path');
var config = require('../config')
var Storage = require('../modules/storage');

var storage = new Storage(config);

/*
  API: api/visitor?since=10&to20
  Result:
  {
    lenght: 10,
    results: [...]
    paging: {
      next: api/visitor?since=1&from=10,
      back: api/visitor?since=21&from=30
    }
  }
*/

function searchCriteria(queryTerms) {
  const { term, gender, status } = queryTerms;
  let where = {};

  if(term) {
    where['$or'] = [
        { firstName: { $like: `%${term}%` } },
        { lastName: { $like: `%${term}%` } },
        { secondSurename: { $like: `%${term}%` } },
        { alias: { $like: `%${term}%` } }
      ];
  }

  if(gender) where['$and'] = { gender: { $eq: gender } };

  if(status) where['$and'] = { status: { $eq: status } };

  return where;
}

router.get('/', function(req, res, next) {
  const limit = parseInt(req.query.size);
  const offset = parseInt(req.query.since);
  const where = searchCriteria(req.query);

  models.Visitor.findAll({
    where, offset, limit
  })
  .then(function(visitors) {
    res.json({
      size: visitors.length,
      results: visitors,
      paging: {
        next: `/api/visitor?since=${offset + limit}&size=${limit}`,
        back: `/api/visitor?since=${offset >= limit ? (offset - limit) : 0}&size=${limit}`
      }
    });
  });

});

router.get('/:id', function(req, res, next) {
  models.Visitor
    .findOne({
      where: { id: req.params.id }
    })
    .then(function(visitor) {
      visitor = visitor.get({ plain: true });
      res.json(visitor);
    });
});

router.put('/:id', function(req, res, next) {
  models.Visitor
  .findOne({ where : { id: req.params.id } })
  .then(function(visitor) {
    visitor.update(req.body, { fields: ['firstName', 'lastName', 'location', 'birthDate'] })
      .then(function(visitor) {
        res.json(visitor);
      });
  });
});

router.post('/', function(req, res, next) {
	models.Visitor
      .findOrCreate({
        where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          secondSurename: req.body.secondSurename,
        },
        defaults: req.body})
      .spread(function(visitor, created) {
        var avatar = `profile${visitor.id}.png`;
        storage.storeb64(avatar, req.body.profilePic);

        res.json(visitor);
      });
});

router.get('/:id/avatar', function(req, res){
  var avatar = `profile${req.params.id}.png`;
  var file = path.join(__dirname, '../../storage'+ '/' + avatar);
  console.log(file);
  res.sendFile(file);
});

router.get('/:id/appointments', function(req, res, next) {
  var queryString = "select a.id, a.reason, a.comment, datetime(a.startDate, 'localtime') as startDate, datetime(a.scheduleEndDate, 'localtime') as scheduleEndDate, datetime(a.endDate, 'localtime') as endDate, sv.resource from Services sv join Supports s on sv.id = s.ServiceId and s.VisitorId = :visitorId join Appointments a on a.SupportId = s.id";

  models.sequelize
  .query(queryString, {
    replacements: { visitorId: req.params.id },
    type: models.sequelize.QueryTypes.SELECT
  })
  .then(function(appointments) {
    res.json(appointments);
  });
});

module.exports = router;
