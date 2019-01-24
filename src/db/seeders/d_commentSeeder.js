module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Comments', [{
    artId: 1,
    body: 'Comment for user 1, art 1',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 1, art 2',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 2, art 2',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 1, art 1',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 1, art 2',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 2, art 2',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 1, art 1',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 1, art 2',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 1,
    body: 'Comment for user 2, art 2',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 2,
    body: 'Comment for user 1, art 1',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 2,
    body: 'Comment for user 1, art 2',
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artId: 2,
    body: 'Comment for user 2, art 2',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
