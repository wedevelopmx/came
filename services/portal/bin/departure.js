const models = require("../app/models");
const processArguments = require('./helper/arguments');
const config = require('./config/index');
const ProfilerFactory = require('profiler');
const profiler = new ProfilerFactory(config);

console.log('Storage: ', profiler.storage.getPath());

models.sequelize.sync().then(function () {
  const params = processArguments();

  var queryString = "select v.id from Visitors v left outer join Departures d on v.id = d.VisitorId where d.id is null";

  models.sequelize
  .query(queryString, {
    type: models.sequelize.QueryTypes.SELECT
  })
  .then(function(visitors) {
    let departures = [];
    let startDate = new Date();
    let scheduleEndDate = new Date();
    scheduleEndDate.setDate(startDate.getDate() + 3);

    visitors.forEach((visitor) => {
      departures.push({
        VisitorId: visitor.id,
        state: 'hospedado',
        startDate: startDate,
        scheduleEndDate: scheduleEndDate
      });
    });

    console.log('Departures', departures);
    models.Departure.bulkCreate(departures).then(() => {
      console.log('Departure created');
    }).catch((error) => console.log(error));
  });

});
