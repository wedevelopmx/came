const models = require("../app/models");
const processArguments = require('./helper/arguments');
const config = require('./config/index');
const ProfilerFactory = require('profiler');
const profiler = new ProfilerFactory(config);

console.log('Storage: ', profiler.storage.getPath());

var fetchBatch = function(batchElements) {
  let profiles = [];

  for(var i = 0; i < batchElements; i++)
    profiles.push(profiler.fetchProfile());

  Promise.all(profiles)
  .then((profileRecords) => {
    profileRecords.forEach((profile, index) => {
        console.log(`${index + 1}.- ${profile.firstName } ${profile.lastName} (${profile.gender})`);
    });

    models.Visitor.bulkCreate(profileRecords)
    .then(() => {
      console.log('Updated successfully');
    })
    .catch(() => {
      console.log('Could not update the batch');
    });
  });
}

models.sequelize.sync().then(function () {
  let { n } = processArguments();

  for(var i = 1 ;i <= n; i++) {
    setTimeout(() => fetchBatch(3), i * 500);
  }
});
