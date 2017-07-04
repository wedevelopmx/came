const mongoose = require('mongoose');
const Category = require('../../app/models/category');

//DB setup
mongoose.connect("mongodb://mongo:27017");

const categories = [{
  name: 'gender',
  entries: [{ name: 'masculino'}, { name: 'femenino'}, { name: 'transgenero'}]
}, {
  name: 'status',
  entries: [{ name: 'migrante'}, { name: 'visitante'}]
}, {
  name: 'alert',
  entries: [{ name: 'informacion'}, { name: 'adventencia'}, { name: 'amonestacion'}]
}];

categories.forEach(function(data) {
    var category = new Category(data);
    category.save(function(err) {
      if (err) throw err;
      console.log(`Category ${data.name} saved successfully!`);
    });
});
