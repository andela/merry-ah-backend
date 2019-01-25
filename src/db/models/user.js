module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    signUpType: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {});
  User.associate = (models) => {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile'
    });
    User.hasMany(models.Art, {
      foreignKey: 'artistId',
    });
    User.hasMany(models.Rate, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Following, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Following, {
      foreignKey: 'followerId'
    });
    User.hasMany(models.Transaction, {
      foreignKey: 'buyerId'
    });
    User.hasMany(models.Transaction, {
      foreignKey: 'sellerId'
    });
    User.hasOne(models.FollowSummary, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Like, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Report, {
      foreignKey: 'userId'
    });
  };
  return User;
};
