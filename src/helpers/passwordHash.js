import bcrypt from 'bcryptjs';

const passwordHash = (password, salt) => {
    return  bcrypt.hashSync(password, salt);
}

export default passwordHash;
