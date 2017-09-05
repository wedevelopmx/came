const models = require("../app/models");
const processArguments = require('./helper/arguments');
const config = require('./config/index');
const ProfilerFactory = require('profiler');
const profiler = new ProfilerFactory(config);

// node bin/departure.js startDate=08-01-2017 days=35 visitors=5
console.log('Storage: ', profiler.storage.getPath());

var processDayVisitors = function(startDate, visitors, offset) {
  var queryString = `select v.id from Visitors v left outer join Departures d on v.id = d.VisitorId where d.id is null limit ${visitors} offset ${offset}`;

  console.log(`Processing ${startDate}`);

  models.sequelize
  .query(queryString, {
    type: models.sequelize.QueryTypes.SELECT
  })
  .then(function(visitors) {
    let departures = [];
    let today = new Date();
    let scheduleEndDate = offsetDate(startDate, 3);
    let overdueDate = offsetDate(scheduleEndDate, 1);

    visitors.forEach((visitor) => {
      let state = 'baja definitiva';
      let endDate = scheduleEndDate;
      let probability = Math.random();

      if(scheduleEndDate.getTime() < today.getTime()) {
        if(probability > 0.95) {
          state = 'expulsado';
        } else if(probability > 0.85) {
          endDate = overdueDate
        }
      } else {
          state = 'hospedado';
          endDate = null;
      }

      departures.push({
        VisitorId: visitor.id,
        state,
        startDate,
        scheduleEndDate,
        endDate
      });
    });

    models.Departure.bulkCreate(departures).then(() => {
      console.log('Departure created');
    }).catch((error) => console.log(error));
  });

}

var offsetDate = function(date, offset) {
  return new Date(date.getTime() + (offset * 86400000));
}

models.sequelize.sync().then(function () {
  const { startDate, days, visitors } = processArguments();

  if(startDate && days && visitors) {
    for(var i = 0; i < days; i++) {
      processDayVisitors(offsetDate(new Date(startDate), i), visitors, visitors * i);
    }
  } else {
    console.log('You did not provide enough information');
  }

});
