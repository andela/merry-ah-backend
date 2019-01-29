module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    artId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Bookmark.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Bookmark;
};
