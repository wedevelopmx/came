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

/* Visitor search criteria*/
function searchCriteria(queryTerms) {
  const { term, gender, status,  } = queryTerms;
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

  return where;
}

/* Departure search criteria */
function departureSearchCriteria(queryTerms) {
  const { departure, checkinFrom, checkinTo, checkoutFrom, checkoutTo } = queryTerms;
  let where = {
    $and : []
  };

  where.$and.push(!departure ? { endDate: { $eq: null } } : departure == 'all' ? {} : { state: { $eq: departure } });

  if(checkinFrom && checkinTo)
    where.$and.push({
      startDate: {
        $gte: new Date(checkinFrom),
        $lte: new Date(checkinTo)
      }
    });

  if(checkoutFrom && checkoutTo)
    where.$and.push({
      scheduleEndDate: {
        $gte: new Date(checkoutFrom),
        $lte: new Date(checkoutTo)
      }
    });

  return where;
}

function orderCriteria(queryTerms) {
  const orderBy = queryTerms.orderBy  ||  'departure.startDate';
  const order = queryTerms.order  ||  'ASC';

  // if(orderBy == 'birthdate' || orderBy == 'departure.startDate' || orderBy == 'departure.scheduleEndDate' || orderBy == 'departure.endDate') {
  //   return [[models.Sequelize.literal('DATE(' + orderBy + ')'), order]];
  // }
  return [[models.Sequelize.literal(orderBy), order]]
}

router.get('/', function(req, res, next) {
  const limit = parseInt(req.query.size || 10);
  const offset = parseInt(req.query.since || 0);
  const where = searchCriteria(req.query);

  models.Visitor.findAndCountAll({
    attributes: ["id", "firstName", "lastName", "secondSurename","gender", "alias", "avatar", "country", "state", "status", "birthdate"],
    where, offset, limit,
    include: [{
      attributes: ['state', 'startDate', 'scheduleEndDate', 'endDate', 'comment'],
      model: models.Departure,
      where: departureSearchCriteria(req.query),
      as: 'departure'
    }],
    order: orderCriteria(req.query)
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

function findVisitor(visitorId) {
  return new Promise((resolve, reject) => {
    models.Visitor
      .findOne({
        attributes: ["id", "firstName", "lastName", "secondSurename", "alias", "gender", "avatar", "country", "state", "town", "status", "birthdate"],
        where: { id: visitorId },
        include: [{
          attributes: ['state', 'startDate', 'scheduleEndDate', 'endDate', 'comment'],
          model: models.Departure,
          as: 'departure'
        }]
      })
      .then(resolve)
      .catch(reject);
  });
}

router.get('/:id', function(req, res, next) {
  findVisitor(req.params.id)
    .then(function(visitor) {
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

function baseDeparture(VisitorId) {
  let startDate = new Date();
  let scheduleEndDate= new Date();
  return {
    state: 'normal',
    startDate,
    scheduleEndDate: scheduleEndDate.setDate(scheduleEndDate.getDate() + 3),
    VisitorId
  };
}

router.post('/', function(req, res, next) {
  req.body.avatar = crypto.randomBytes(20).toString('hex');
	models.Visitor
    .findOrCreate({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      },
      defaults: req.body
    })
    .spread(function(visitor, created) {
      if(created) {
        // Save picture
        storage.storeb64(`${visitor.avatar}.jpg`, req.body.profilePic);
        // Create departure details
        models.Departure
        .create(baseDeparture(visitor.id))
        .then(() => {
          findVisitor(visitor.id)
            .then(function(visitor) {
              res.json(visitor);
            });
        });
      } else {
        // Return available user
        findVisitor(visitor.id)
          .then(function(visitor) {
            res.json(visitor);
          });
      }
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

router.put('/:id/departure', (req, res) => {
  models.Departure
  .findOne({ where : { VisitorId: req.params.id } })
  .then(function(departure) {
    departure.update(req.body, { fields: ['state', 'startDate', 'scheduleEndDate', 'endDate', 'comment'] })
      .then(function(departure) {
        res.json(departure);
      });
  });
});

module.exports = router;
