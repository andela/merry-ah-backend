module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Arts', [{
    artistId: 1,
    slug: 'painting-make-sense',
    title: 'My Painting',
    description: true,
    categoryId: 1,
    featuredImg: 'www.imageurl.com/myImage',
    status: true,
    price: 6000,
    visited: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    artistId: 6,
    slug: 'painting-make-sense',
    title: 'My Painting',
    description: true,
    categoryId: 1,
    featuredImg: 'www.imageurl.com/myImage',
    status: true,
    price: 9000,
    visited: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Arts', null, {})
};
