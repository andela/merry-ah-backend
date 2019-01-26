module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Arts', [{
    artistId: 1,
    slug: 'Some slugish slug',
    title: 'Some titles',
    description: 'Some descriptions',
    categoryId: 1,
    featuredImg: 'some link',
    status: true,
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
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artistId: 1,
    slug: 'painting-make-sense',
    title: 'My Painting',
    description: true,
    categoryId: 1,
    featuredImg: 'www.imageurl.com/myImage',
    status: true,
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
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    artistId: 7,
    slug: 'painting-make-sense',
    title: 'My Painting',
    description: true,
    categoryId: 1,
    featuredImg: 'www.imageurl.com/myImage',
    status: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Arts', null, {})
};
