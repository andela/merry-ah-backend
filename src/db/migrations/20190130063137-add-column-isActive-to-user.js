module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Users',
    'isActive',
    Sequelize.BOOLEAN
  ),
  down: queryInterface => queryInterface.removeColumn('Users', 'isActive'),
};
