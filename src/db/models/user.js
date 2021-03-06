module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    signUpType: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
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
    User.hasMany(models.Dislike, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'User'
    });
    User.hasMany(models.CommentReaction, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Bookmark, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Report, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Notifications, {
      foreignKey: 'userId'
    });
  };
  return User;
};
