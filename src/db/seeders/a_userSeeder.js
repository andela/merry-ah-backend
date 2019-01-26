const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      username: 'Juliet',
      userType: 'admin',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
      email: 'julietezekwe@gmail.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Juliet',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
      email: 'createart@gmail.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Juliet',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
      email: 'mockuser@gmail.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'abejide-femi',
      userType: 'admin',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('abcdefgh', bcrypt.genSaltSync(8)),
      email: 'email@gmail.com',
      isActive: true,
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
      isActive: true,
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
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Chidimma',
      userType: 'artist',
      signUpType: 'local',
      isVerified: true,
      password: bcrypt.hashSync('chidimma', bcrypt.genSaltSync(8)),
      email: 'chidimmajuliet89@gmail.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
