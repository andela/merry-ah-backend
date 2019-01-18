module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RateSummaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Arts',
          key: 'id',
          as: 'artId',
        }
      },
      caculatedRate: {
        type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('RateSummaries')
};
