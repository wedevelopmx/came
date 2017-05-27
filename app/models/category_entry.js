"use strict";

module.exports = function(sequelize, DataTypes) {
  var CategoryEntry = sequelize.define("CategoryEntry", {
    name: { type: DataTypes.STRING, name: "name"},
    description: { type: DataTypes.STRING, name: "description"}
  }, {
      classMethods: {
        associate: function(models) {
          CategoryEntry.belongsTo(models.Category);
        }
      }
  });

  return CategoryEntry;
}
