"use strict";

module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define("Service", {
    name: { type: DataTypes.STRING, name: "name" },
    description: { type: DataTypes.STRING, name: "description" },
    resource: { type: DataTypes.STRING, name: 'image'},
    instructions: { type: DataTypes.STRING, name: "instruction" },
    pictureDataURI: { type: DataTypes.STRING, name: 'picture_data_uri'},
    appointmentCatalog: { type: DataTypes.STRING, name: 'appointment_catalog'}
  }, {
    classMethods: {
      associate: function(models) {
        Service.belongsToMany(models.Visitor, { as: 'visitors', through: 'Support' });
      }
    }
  });

  return Service;
}
