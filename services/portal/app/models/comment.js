"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    comment: { type: DataTypes.STRING, name: "comment" },
    type: { type: DataTypes.STRING, name: "type"}
  }, {
      classMethods: {
        associate: function(models) {
          Comment.belongsTo(models.Visitor);
        }
      }
  });

  return Comment;
}
