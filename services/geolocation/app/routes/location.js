const express = require('express');
const router = express.Router();
const Country = require('../models/country');

router.get('/', function(req, res, next) {
  // get all the users
  Country.find({}, { name: 1 } , function(err, countries) {
    if (err) throw err;
    // object of all the countries
    res.json(countries);
  });
});

router.get('/:id', function(req, res, next) {
  // get all the users
  Country.findOne({ _id: req.params.id }, { cities: 1, "cities.name": 1 } , function(err, country) {
    if (err) throw err;
    // object of all the country
    res.json(country.cities);
  });
});

module.exports = router;
