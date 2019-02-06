module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LikeSummaries', {
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
    noOfLikes: {
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
  }),
  down: queryInterface => queryInterface.dropTable('LikeSummaries')
};
