module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [{
    categoryName: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
