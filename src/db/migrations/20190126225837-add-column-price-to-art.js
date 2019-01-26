module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Arts', 'price', {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.00,
    after: 'featuredImg'
  }),
  down: queryInterface => queryInterface.removeColumn('Arts', 'price'),
};
