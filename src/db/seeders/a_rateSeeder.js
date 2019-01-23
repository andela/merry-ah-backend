const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
/** Create seed user */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
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
  }, {
    username: 'Juliet',
    userType: 'artist',
    signUpType: 'local',
    isVerified: true,
    password: bcrypt.hashSync('femiok', bcrypt.genSaltSync(8)),
    email: 'mockuser@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
