module.exports = (sequelize, DataTypes) => {
  const UpdatedComment = sequelize.define('UpdatedComment', {
    commentId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  UpdatedComment.associate = function (models) {
    // associations can be defined here
    UpdatedComment.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return UpdatedComment;
};
