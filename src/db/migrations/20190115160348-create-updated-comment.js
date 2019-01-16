module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UpdatedComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Comments',
          key: 'id',
          as: 'commentId',
        }
      },
      body: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('UpdatedComments')
};
