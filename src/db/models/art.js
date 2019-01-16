
module.exports = (sequelize, DataTypes) => {
  const Art = sequelize.define('Art', {
    user_id: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    featuredImg: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Art.associate = function (models) {
    // associations can be defined here
    Art.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });

    Art.hasMany(models.Media, {
      foreignKey: 'art_id'
    });
  };
  return Art;
};
