const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Country = require('../../app/models/country');
const rootDir = path.join(__dirname, '../seed/geodata');

//DB setup
mongoose.connect("mongodb://mongo:27017");

console.log('Path:', rootDir)

function loadCountries() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${rootDir}/countries.json`, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

function loadCities(country) {
  if(!country.filename)
    return country;

  return new Promise((resolve, reject) => {
    fs.readFile(`${rootDir}/countries/${country.filename}.json`, 'utf8', (err, data) => {
      if (err) reject(err);
      country.cities = JSON.parse(data);
      resolve(country);
    });
  });
}

function processCountries(countries) {
  const promises = countries.map((country) => {
    return loadCities(country);
  });

  return Promise.all(promises);
}

function saveCountries(countries) {
  countries.forEach((countryObj) => {
    var country = new Country(countryObj);
    country.save(function(err) {
      if (err) throw err;
      console.log(`Country ${countryObj.name} successfully!`);
    });
  });

}


loadCountries()
  .then(processCountries)
  .then(saveCountries);
