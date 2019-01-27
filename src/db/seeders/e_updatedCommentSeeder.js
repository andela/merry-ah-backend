module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UpdatedComments', [{
    commentId: 1,
    body: 'Comment for user 1, art 1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    commentId: 1,
    body: 'Comment for user 1, art 1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    commentId: 2,
    body: 'Comment for user 1, art 1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('UpdatedComments', null, {})
};
