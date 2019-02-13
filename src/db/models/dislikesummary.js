'use strict';
module.exports = (sequelize, DataTypes) => {
  const DislikeSummary = sequelize.define('DislikeSummary', {
    artId: DataTypes.INTEGER,
    noOfLikes: DataTypes.INTEGER
  }, {});
  DislikeSummary.associate = function (models) {
    // associations can be defined here
    DislikeSummary.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return DislikeSummary;
};
