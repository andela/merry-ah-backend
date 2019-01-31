module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('CommentReactionSummaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noOfLikes: {
        type: Sequelize.INTEGER
      },
      commentId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Comments',
          key: 'id',
          as: 'commentId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('CommentReactionSummaries')
};
