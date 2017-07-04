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
}, {
  name: 'checkout',
  entries: [{ name: 'Salida al tren'}, { name: 'Salida permanente'}]
}, {
  name: 'health',
  entries: [{ name: 'Revision en hospital'}, { name: 'Hospitalizacion necesaria'}, { name: 'Salida a farmacia'}]
}, {
  name: 'social',
  entries: [{ name: 'Visita a psicologo'}, { name: 'Visita a centro de atencion externo'}]
}, {
  name: 'law',
  entries: [{ name: 'Tramite de documentacion FM4'}, { name: 'Visita a consulado'}, { name: 'Visita a minsiterio publico' }]
}, {
  name: 'work',
  entries: [{ name: 'Trabajo comunitario'}, { name: 'Trabajo en campana de limpieza'}]
}];

categories.forEach(function(data) {
    var category = new Category(data);
    category.save(function(err) {
      if (err) throw err;
      console.log(`Category ${data.name} saved successfully!`);
    });
});
