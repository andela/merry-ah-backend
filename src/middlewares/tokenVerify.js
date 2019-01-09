import jwt from 'jsonwebtoken';

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
            const decoded = await jwt.verify(token, keyconfig);
            req.decoded = decoded;
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
