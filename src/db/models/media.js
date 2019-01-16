'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    content_url: DataTypes.TEXT,
    media_type: DataTypes.STRING,
    art_id: DataTypes.INTEGER
  }, {});
  Media.associate = function(models) {
    // associations can be defined here
    Media.belongsTo(models.Art, {
      foreignKey: 'art_id',
      as: 'media',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Media;
};
