"use strict";

module.exports = function(sequelize, DataTypes) {
  var Departure = sequelize.define("Departure", {
    state: { type: DataTypes.STRING, name: "state"},
    startDate: { type: DataTypes.DATE, name: "start_date"},
    scheduleEndDate: { type: DataTypes.DATE, name: "schedule_end_date"},
    endDate: { type: DataTypes.DATE, name: "end_date"},
    comment: { type: DataTypes.STRING, name: "comment" }
  }, {
      classMethods: {
        associate: function(models) {
          Departure.belongsTo(models.Visitor);
        }
      }
  });

  return Departure;
}
