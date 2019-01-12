import bcrypt from 'bcryptjs';

const passwordHash = (password, salt) => bcrypt.hashSync(password, salt);

export default passwordHash;
