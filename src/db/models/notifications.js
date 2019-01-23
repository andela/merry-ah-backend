'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Notifications.associate = function(models) {
    Notifications.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'notifications',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });  };
  return Notifications;
};
