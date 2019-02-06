
module.exports = (sequelize, DataTypes) => {
  const Art = sequelize.define('Art', {
    artistId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    visited: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    featuredImg: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Art.associate = function (models) {
    // associations can be defined here
    Art.belongsTo(models.User, {
      foreignKey: 'artistId',
      as: 'Author'
    });
    Art.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'Category'
    });
    Art.hasMany(models.Media, {
      foreignKey: 'artId',
      as: 'Media'
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
    Art.hasOne(models.RateSummary, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Art.hasMany(models.Bookmark, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Art.hasMany(models.Report, {
      foreignKey: 'artId'
    });
  };
  return Art;
};
