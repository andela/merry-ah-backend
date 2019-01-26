'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReadingStat = sequelize.define('ReadingStat', {
    visited: DataTypes.INTEGER
  }, {});
  ReadingStat.associate = function(models) {
    // associations can be defined here
    ReadingStat.belongsTo(models.Art, {
      foreignKey: 'artId',
      as: 'arts',
      onDelete: 'CASCADE'
    });
  };
  return ReadingStat;
};
