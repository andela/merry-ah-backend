module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ReportSummaries', [{
    userId: 6,
    reportCount: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('ReportSummaries', null, {})
};
