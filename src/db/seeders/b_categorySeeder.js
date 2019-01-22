module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [{
    categoryName: 'Poetry',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    categoryName: 'Sculpture',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    categoryName: 'Architecture',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    categoryName: 'Painting',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    categoryName: 'Free hand sketch',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    categoryName: 'Mosaic',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
