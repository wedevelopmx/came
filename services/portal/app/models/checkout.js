"use strict";

module.exports = function(sequelize, DataTypes) {
  var Checkout = sequelize.define("Checkout", {
    reason: { type: DataTypes.STRING, name: "reason"},
    comment: { type: DataTypes.STRING, name: "comment" },
    startDate: { type: DataTypes.DATE, name: "start_date"},
    scheduleEndDate: { type: DataTypes.DATE, name: "schedule_end_date"},
    endDate: { type: DataTypes.DATE, name: "end_date"}
  }, {
      classMethods: {
        associate: function(models) {
          Checkout.belongsTo(models.Visitor);
        }
      }
  });

  return Checkout;
}
