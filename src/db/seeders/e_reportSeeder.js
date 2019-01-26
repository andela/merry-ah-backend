module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Reports', [{
    reportText: 'I hate this art',
    artId: 5,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    reportText: 'I hate this art',
    artId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    reportText: 'I hate this art',
    artId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Reports', null, {})
};
