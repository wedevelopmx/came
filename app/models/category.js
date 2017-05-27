"use strict";

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: { type: DataTypes.STRING, name: "name"},
    description: { type: DataTypes.STRING, name: "description"}
  }, {
      classMethods: {
        associate: function(models) {
          Category.hasMany(models.CategoryEntry, { as: 'entries'});
        }
      }
  });

  return Category;
}
