const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    username: 'abejide-femi',
    userType: 'artist',
    signUpType: 'local',
    isVerified: true,
    password: bcrypt.hashSync('vbvbbvhhdfjhdf', bcrypt.genSaltSync(8)),
    email: 'email@ok.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
