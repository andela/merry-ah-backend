const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'abejide-femi',
    userType: 'artist',
    signUpType: 'local',
    isVerified: true,
    password: bcrypt.hashSync(process.env.PASSWORD, bcrypt.genSaltSync(8)),
    email: 'email@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'abejide-femi',
    userType: 'artist',
    signUpType: 'local',
    isVerified: true,
    password: bcrypt.hashSync(process.env.PASSWORD, bcrypt.genSaltSync(8)),
    email: 'email1@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
