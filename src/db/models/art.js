
module.exports = (sequelize, DataTypes) => {
  const Art = sequelize.define('Art', {
    artistId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    featuredImg: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Art.associate = function (models) {
    // associations can be defined here
    Art.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
    Art.hasMany(models.Media, {
      foreignKey: 'artId'
    });
    Art.hasMany(models.Rate, {
      foreignKey: 'artId'
    });
    Art.hasMany(models.Comment, {
      foreignKey: 'artId'
    });
    Art.hasMany(models.Like, {
      foreignKey: 'artId'
    });
    Art.hasOne(models.LikeSummary, {
      foreignKey: 'artId'
    });
    Art.hasOne(models.Transaction, {
      foreignKey: 'artId'
    });
  };
  return Art;
};