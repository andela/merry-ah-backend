module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reportText: {
      type: DataTypes.STRING
    },
    artId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Art',
        key: 'id',
        as: 'artId',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  }, {});
  Report.associate = (models) => {
    // associations can be defined here
    Report.belongsTo(models.Art, {
      foreignKey: 'artId',
      as: 'arts',
      onDelete: 'CASCADE'
    });
    Report.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Report;
};
