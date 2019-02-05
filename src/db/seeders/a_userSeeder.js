const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      username: 'Juliet',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
      email: 'julietezekwe@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Juliet',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
      email: 'createart@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Juliet',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
      email: 'mockuser@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'abejide-femi',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('abcdefgh', bcrypt.genSaltSync(8)),
      email: 'email@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'abejide-femi',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('abcdefgh', bcrypt.genSaltSync(8)),
      email: 'email1@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Juliet',
      userType: 'user',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
      email: 'gentle883@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
