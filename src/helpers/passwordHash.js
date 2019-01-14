import bcrypt from 'bcryptjs';

const passwordHash = (password, salt) => bcrypt.hashSync(password, salt);
/**
   * Compare Password Method
   * @static
   * @param {string} password
   * @param {string} hashPassword
   * @returns {Boolean} return True or False
   */
function comparePassword(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

export { passwordHash, comparePassword };
