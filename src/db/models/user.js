
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
      foreignKey: 'userId'
    });
  };
  return User;
};
