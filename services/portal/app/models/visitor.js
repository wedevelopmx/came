"use strict";

module.exports = function(sequelize, DataTypes) {
  var Visitor = sequelize.define("Visitor", {
    firstName: { type: DataTypes.STRING, name: "first_name" },
    lastName: { type: DataTypes.STRING, name: "last_name"},
    secondSurename: { type: DataTypes.STRING, name: "second_surename"},
    alias: { type: DataTypes.STRING, name: "alias"},
    gender: { type: DataTypes.STRING, name: "gender" },
    avatar: { type: DataTypes.STRING, name: "avatar"},
    country: { type: DataTypes.STRING, name: "country"},
    state: { type: DataTypes.STRING, name: "state"},
    town: { type: DataTypes.STRING, name: "town"},
    status: { type: DataTypes.STRING, name: "status"},
    birthdate: {type: DataTypes.DATE, name: "birth_date"}
  }, {
      classMethods: {
        associate: function(models) {
          Visitor.hasMany(models.Comment, { as: 'comments'});
          Visitor.hasMany(models.Checkout, { as: 'checkouts'});
          //Visitor.hasMany(models.Appointment, { as: 'appointments'});

          Visitor.belongsToMany(models.Service, { as: 'services', through: 'Support' });
        }
      }
  });

  return Visitor;
}
