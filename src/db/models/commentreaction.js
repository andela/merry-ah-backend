module.exports = (sequelize, DataTypes) => {
  const CommentReaction = sequelize.define('CommentReaction', {
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comment',
        key: 'id',
        as: 'commentId',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  }, {});
  // eslint-disable-next-line func-names
  CommentReaction.associate = function (models) {
    // associations can be defined here
    CommentReaction.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      as: 'comment',
      onDelete: 'CASCADE'
    });
    CommentReaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return CommentReaction;
};
