import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const keyconfig = process.env.SECRET;

const Verify = {
    async tokenVerify (req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({
                status: 'error',
                message: 'No token provided.',
            });
        }
        try {
            const verifyUser = await jwt.verify(token, keyconfig);
            req.verifyUser = verifyUser;
            next();
        } catch (error) {
            return res.status(401).send({
                status: 'error',
                message: 'Unauthorized token',
            });
        }
    }
}

export default Verify;
