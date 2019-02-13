import Validation from '../helpers/Validation';
import models from '../db/models';
import Response from '../helpers/response';

const { User, Art } = models;

/**
 * User Middleware Class
 */
class UserMiddleware {
/**
 * VerifyEmail
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @memberof UserMiddleware
 * @returns {object} email verification
 */
  static async VerifyEmail(req, res, next) {
    try {
      const { email } = req.body;
      const validateEmail = Validation.checkEmptyField(email);
      if (validateEmail !== true) {
        const response = new Response(
          'Bad Request',
          400,
          'Email field cannot be left empty',
        );
        return res.status(response.code).json(response);
      }
      const checkEmail = await User.findOne({
        where: {
          email,
        },
        attributes: ['username', 'email'],
      });
      if (!checkEmail) {
        const response = new Response(
          'Not Found',
          404,
          'Email does not exist',
        );
        return res.status(response.code).json(response);
      }
      req.checkEmail = checkEmail;
      next();
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
 * Validate Password
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @memberof UserMiddleware
 * @returns {object} validated password
 */
  static async validatePassword(req, res, next) {
    try {
      const user = req.verifyUser;
      const { email } = user;
      const { password, confirmPassword } = req.body;

      const fields = [
        { name: 'Password', value: password },
        { name: 'Confirm Password', value: confirmPassword }
      ];

      const validate = Validation.checkEmptyFields(fields);

      if (validate !== true) {
        const response = new Response(
          'Bad Request',
          400,
          `${validate.field} field cannot be empty`,
        );
        return res.status(response.code).json(response);
      }

      if (!Validation.compareValues(password, confirmPassword)) {
        const response = new Response(
          'Bad Request',
          400,
          'Passwords do not match'
        );
        return res.status(response.code).json(response);
      }
      req.email = email;
      next();
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @memberof UserMiddleware
   * @returns {object} error if IDs are invalid
   */
  static async validateFollowerAndArtistID(req, res, next) {
    try {
      let { artistId } = req.params;
      const { id } = req.verifyUser;

      /* eslint-disable no-restricted-globals */
      if (isNaN(artistId)) {
        const response = new Response(
          'Bad Request',
          400,
          'Artist ID must be an integer',
        );
        return res.status(response.code).json(response);
      }

      artistId = Number(artistId);

      if (artistId === id) {
        const response = new Response(
          'Bad Request',
          400,
          'You cannot follow or unfollow yourself',
        );
        return res.status(response.code).json(response);
      }

      const checkIfUserExist = await User.findOne({
        where: {
          id,
        }
      });

      const checkIfArtistExist = await User.findOne({
        where: {
          id: artistId,
          userType: 'artist',
        }
      });

      if (!checkIfUserExist || !checkIfArtistExist) {
        const response = new Response(
          'Not Found',
          404,
          'User may not exist or is not an artist',
        );
        return res.status(response.code).json(response);
      }

      req.artistId = artistId;
      next();
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
 * Validate Password
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @memberof UserMiddleware
 * @returns {object} error object if artist id is not a number
 */
  static async validateArtistID(req, res, next) {
    const { artistId } = req.params;
    /* eslint-disable no-restricted-globals */
    if (isNaN(artistId)) {
      const response = new Response(
        'Bad Request',
        400,
        'Artist ID must be an integer',
      );
      return res.status(response.code).json(response);
    }

    next();
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @memberof UserMiddleware
   * @returns {object} error if user do is not an integer
   */
  static async checkUserID(req, res, next) {
    try {
      const { userId } = req.params;

      /* eslint-disable no-restricted-globals */
      if (isNaN(userId)) {
        const response = new Response(
          'Bad Request',
          400,
          'User ID must be an integer',
        );
        return res.status(response.code).json(response);
      }
      next();
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @memberof UserMiddleware
   * @returns {object} error if IDs are invalid
   */
  static async validateArtID(req, res, next) {
    try {
      const { artId } = req.params;

      /* eslint-disable no-restricted-globals */
      if (isNaN(artId)) {
        const response = new Response(
          'Bad Request',
          400,
          'Art ID must be an integer',
        );
        return res.status(response.code).json(response);
      }

      const checkIfArtExist = await Art.findOne({
        where: {
          id: artId,
        }
      });

      if (!checkIfArtExist) {
        const response = new Response(
          'Not Found',
          404,
          'The art you requested does not exist',
        );
        return res.status(response.code).json(response);
      }

      next();
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default UserMiddleware;
