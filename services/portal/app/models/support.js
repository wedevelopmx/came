"use strict";

module.exports = function(sequelize, DataTypes) {
  var Support = sequelize.define("Support", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: { type: DataTypes.DATE, name: "start_date"},
    interview: { type: DataTypes.BOOLEAN, name: "interview"},
    psychological: { type: DataTypes.BOOLEAN, name: "psychological"},
    interviewComment: { type: DataTypes.STRING, name: 'interview_commment' },
    psychologicalComment: { type: DataTypes.STRING, name: 'psychological_commment' }
  }, {
    classMethods: {
      associate: function(models) {
          // Support.belongsTo(models.Visitor);
          // Support.belongsTo(models.Service);
          Support.hasMany(models.Appointment, { as: 'appointments', foreignKey: 'SupportId' });
      }
    }
  });

  return Support;
}
