module.exports = (sequelize, DataTypes) => {
  const FollowSummary = sequelize.define('FollowSummary', {
    userId: DataTypes.INTEGER,
    followers: DataTypes.INTEGER,
    following: DataTypes.INTEGER
  }, {});
  FollowSummary.associate = function (models) {
    // associations can be defined here
    FollowSummary.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return FollowSummary;
};
