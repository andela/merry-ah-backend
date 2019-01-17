module.exports = (sequelize, DataTypes) => {
  const RateSummary = sequelize.define('RateSummary', {
    artId: DataTypes.INTEGER,
    caculatedRate: DataTypes.INTEGER
  }, {});
  RateSummary.associate = (models) => {
    // associations can be defined here
    RateSummary.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return RateSummary;
};
