module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    artId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Comment.hasMany(models.UpdatedComment, {
      foreignKey: 'commentId'
    });
    Comment.hasMany(models.CommentReaction, {
      foreignKey: 'commentId'
    });
    Comment.hasOne(models.CommentReactionSummary, {
      foreignKey: 'commentId'
    });
  };
  return Comment;
};
