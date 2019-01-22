module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    contentUrl: DataTypes.TEXT,
    mediaType: DataTypes.STRING,
    artId: DataTypes.INTEGER
  }, {});
  Media.associate = function (models) {
    // associations can be defined here
    Media.belongsTo(models.Art, {
      foreignKey: 'artId',
      as: 'Media',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Media;
};
