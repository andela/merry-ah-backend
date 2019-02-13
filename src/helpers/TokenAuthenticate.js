import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Response from './response';
import models from '../db/models';

const { User } = models;

dotenv.config();

/** Token Authenticate Class */
class TokenAuthenticate {
  /**
   *Generate Token Method
   * @static
   * @param {object} userDetails
   * @param {string} expires
   * @returns {string} returns token
   * @memberof TokenAuthenticate
   */
  static generateToken(userDetails, expires) {
    const token = jwt.sign(userDetails,
      process.env.SECRET, { expiresIn: expires });
    return token;
  }

  /**
   *Verfify Token Method
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {function} returns an object with status and method property
   * @memberof TokenAuthenticate
   */
  static async tokenVerify(req, res, next) {
    const token = req.headers.authorization
      || req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!token) {
      return res.status(401).send({
        status: 'error',
        message: 'No token provided',
      });
    }
    try {
      const verifyUser = await jwt.verify(token, process.env.SECRET);
      const { id } = verifyUser;
      const user = await User.findOne({
        where: { id }
      });
      if (!user.isActive) {
        const response = new Response(
          'Unauthorized',
          401,
          'This account has been deactivated',
        );
        return res.status(response.code).json(response);
      }
      req.verifyUser = verifyUser;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 'error',
        message: 'Unauthorized token',
      });
    }
  }
}

export default TokenAuthenticate;
