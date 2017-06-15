"use strict";

module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    reason: { type: DataTypes.STRING, name: "reason"},
    comment: { type: DataTypes.STRING, name: "comment" },
    startDate: { type: DataTypes.DATE, name: "start_date"},
    endDate: { type: DataTypes.DATE, name: "end_date"},
    duration: { type: DataTypes.INTEGER, name: "duration"}
  }, {
      classMethods: {
        associate: function(models) {
          Appointment.belongsTo(models.Support);
        }
      }
  });

  return Appointment;
}
