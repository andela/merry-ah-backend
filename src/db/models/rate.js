module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    artId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});

  Rate.associate = function (models) {
    // associations can be defined here
    Rate.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Rate.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Rate;
};
