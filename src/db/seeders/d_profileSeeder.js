module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Profiles', [{
    firstName: 'abejide-femi',
    lastName: 'artist',
    bio: null,
    imgURL: null,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'abejide-femi',
    lastName: 'artist',
    bio: null,
    imgURL: null,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'abejide-femi',
    lastName: 'artist',
    bio: null,
    imgURL: null,
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'abejide-femi',
    lastName: 'artist',
    bio: null,
    imgURL: null,
    userId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'abejide-femi',
    lastName: 'artist',
    bio: null,
    imgURL: null,
    userId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'abejide-femi',
    lastName: 'artist',
    bio: null,
    imgURL: null,
    userId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
