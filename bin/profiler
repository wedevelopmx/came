const models = require("../app/models");
const processArguments = require('./helper/arguments');
const config = require('./config/index');
const ProfilerFactory = require('profiler');
const profiler = new ProfilerFactory(config);

console.log('Storage: ', profiler.storage.getPath());

models.sequelize.sync().then(function () {
  const params = processArguments();
  let profiles = [];

  for(var i = 0; i < params.n; i++)
    profiles.push(profiler.fetchProfile());

  Promise.all(profiles)
  .then((profileRecords) => {
    console.log(profileRecords);
    models.Visitor.bulkCreate(profileRecords)
    .then(() => {
      console.log('Updated successfully');
    });
  });

});
