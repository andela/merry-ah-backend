'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dislike = sequelize.define('Dislike', {
    artId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Dislike.associate = function(models) {
    // associations can be defined here
    Dislike.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Dislike.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Dislike;
};
