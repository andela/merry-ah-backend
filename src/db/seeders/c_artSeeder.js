module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Arts', [{
    artistId: 1,
    slug: 'Some slugish slug',
    title: 'Some titles',
    description: 'Some descriptions',
    categoryId: 1,
    featuredImg: 'some link',
    status: false,
    price: 2000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artistId: 2,
    slug: 'Some slugish slug',
    title: 'Some titles',
    description: 'Some descriptions',
    categoryId: 1,
    featuredImg: 'some link',
    status: true,
    price: 3000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Arts', null, {})
};
