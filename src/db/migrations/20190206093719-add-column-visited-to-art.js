module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Arts', 'visited', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),
  down: queryInterface => queryInterface.removeColumn('Arts', 'visited'),
};
