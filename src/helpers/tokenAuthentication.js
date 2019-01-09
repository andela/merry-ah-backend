import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class TokenAuthenticate {
    static generateToken = (userDetails, expires) => {
        const token = jwt.sign(userDetails,
            process.env.SECRET, { expiresIn: expires }
        );
    return token;
    }

    static async tokenVerify (req, res, next) {
        const token = req.headers['Authorization'] || req.headers['x-access-token'] || req.query.token || req.body.token || req.params.token;
        if (!token) {
            return res.status(401).send({
                status: 'error',
                message: 'No token provided',
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

export default TokenAuthenticate;
