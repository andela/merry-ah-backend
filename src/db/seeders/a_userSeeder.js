const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'abejide-femi',
    userType: 'artist',
    signUpType: 'local',
    isVerified: true,
    password: bcrypt.hashSync('abcdefgh', bcrypt.genSaltSync(8)),
    email: 'email@email.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
