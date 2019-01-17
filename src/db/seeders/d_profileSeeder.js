module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Profiles', [{
    firstName: 'abejide-femi',
    lastName: 'artist',
    bio: null,
    imgURL: null,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
