module.exports = (sequelize, DataTypes) => {
  const LikeSummary = sequelize.define('LikeSummary', {
    artId: DataTypes.INTEGER,
    noOfLikes: DataTypes.INTEGER
  }, {});
  LikeSummary.associate = function (models) {
    // associations can be defined here
    LikeSummary.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return LikeSummary;
};