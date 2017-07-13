const express = require('express');
const router = express.Router();
const models = require('../models');
const path = require('path');
const crypto = require('crypto');
const config = require('../config')
const Storage = require('../modules/storage');

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
  const { term, gender, status, departure } = queryTerms;
  let where = {
    $and : []
  };

  if(term) {
    where.$and.push({
      $or: [
        { firstName: { $like: `%${term}%` } },
        { lastName: { $like: `%${term}%` } },
        { secondSurename: { $like: `%${term}%` } },
        { alias: { $like: `%${term}%` } }
      ]
    });
  }

  if(gender) where.$and.push({ gender: { $eq: gender } });

  if(status) where.$and.push({ status: { $eq: status } });

  if(departure) where.$and.push({ departure: { $eq: departure } });

  return where;
}

router.get('/', function(req, res, next) {
  const limit = parseInt(req.query.size || 10);
  const offset = parseInt(req.query.since || 0);
  const where = searchCriteria(req.query);

  models.Visitor.findAndCountAll({
    where, offset, limit
  })
  .then(function(results) {
    // Removing actual offset and size to ovewrite pagination
    delete req.query['since'];
    delete req.query['size'];
    delete req.query['available'];

    // Build response
    res.json({
      size: results.rows.length,
      total: results.count,
      results: results.rows,
      paging: {
        next: Object.assign({ since: offset + limit, size: limit, available: results.count > (offset + limit) }, req.query),
        back: Object.assign({ since: offset >= limit ? (offset - limit) : 0, size: limit , available: offset - limit >= 0 }, req.query)
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
  req.body.avatar = crypto.randomBytes(20).toString('hex');
	models.Visitor
      .findOrCreate({
        where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          secondSurename: req.body.secondSurename,
        },
        defaults: req.body})
      .spread(function(visitor, created) {
        storage.storeb64(`${visitor.avatar}.jpg`, req.body.profilePic);
        res.json(visitor);
      });
});

router.get('/:id/avatar', function(req, res){
  var file = path.join(__dirname, `../../storage/${req.params.id}.jpg`);
  res.sendFile(file);
});

router.get('/:id/appointments', function(req, res, next) {
  var queryString = "select a.id, a.reason, a.comment, a.startDate, a.scheduleEndDate, a.endDate, sv.resource from Services sv join Supports s on sv.id = s.ServiceId and s.VisitorId = :visitorId join Appointments a on a.SupportId = s.id";

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
