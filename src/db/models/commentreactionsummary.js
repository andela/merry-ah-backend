module.exports = (sequelize, DataTypes) => {
  const CommentReactionSummary = sequelize.define('CommentReactionSummary', {
    noOfLikes: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  CommentReactionSummary.associate = function (models) {
    CommentReactionSummary.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return CommentReactionSummary;
};
