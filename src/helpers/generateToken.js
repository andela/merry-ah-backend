import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userDetails, expires) => {
    const token = jwt.sign(userDetails,
        process.env.SECRET, { expiresIn: expires }
    );
   return token;
}
