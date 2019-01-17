import Response from '../helpers/response';
import ratingQuery from '../db/service/rate';


let response;

/**
 * A module that checks if email already exists at sign up
 * @module validateRatingValues
 */
class RatingValidator {
  /**
   * @description - Checks the request parameters for user reg
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof RatingValidator
   */
  static async genericRatingValidator(req, res, next) {
    /** Check if the right keys are sent */
    req.check('artId', 'Item/Art Id is required').trim().notEmpty();
    req.check('authorization',
      'Token is required to access this route').trim().notEmpty();

    /** Verify that values are of required type */
    if (!req.validationErrors()) {
      req.check('artId', 'Item/Art ID must be Integer').isInt();
      req.check('authorization', 'Not a Valid JWT token').isJWT();
    }

    /** Verify that Art ID exists in db */
    if (!req.validationErrors()) {
      const { artId } = req.params;
      try {
        const count = await ratingQuery.getArt(artId);
        const doesArtExist = count === 0;
        req.check('artId', 'Item/Art ID Does not exist')
          .custom(() => !doesArtExist);
      } catch (error) {
        response = new Response(
          'Not Ok',
          500,
          `${error}`
        );
      }
    }

    /** Verify that Art ID exists in db */
    if (!req.validationErrors()) {
      const { id } = req.verifyUser;
      try {
        const count = await ratingQuery.getUser(id);
        const doesUserExist = count === 0;
        req.check('verifyuser', 'User does not exist on the platform')
          .custom(() => !doesUserExist);
      } catch (error) {
        response = new Response(
          'Not Ok',
          500,
          `${error}`
        );
      }
    }

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      response = new Response(
        'Bad Request',
        400,
        'Invalid Credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    return next();
  }

  /**
   * @description - Checks the request parameters for user reg
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof RatingValidator
   */
  static async addRatingValidator(req, res, next) {
    /** Check if the right keys are sent */
    req.check('rating', 'Rating value is required').trim().notEmpty();

    /** Verify that values are of required type */
    if (!req.validationErrors()) {
      req.check('rating', 'Rating must be between 1 and 5')
        .isInt({ min: 1, max: 5 });
      req.check('rating', 'Rating must be Integer').isInt();
    }

    /** Verify that user that created the art can not rate art */
    if (!req.validationErrors()) {
      const { id } = req.verifyUser;
      const { artId } = req.params;

      try {
        const artIdData = await ratingQuery.getArt(artId);
        const isItemAuthor = artIdData.dataValues.artistId === id;
        req.check('verifyuser',
          'Creators are not allowed to rate their own items')
          .custom(() => !isItemAuthor);
      } catch (error) {
        response = new Response(
          'Not Ok',
          500,
          `${error}`
        );
      }
    }

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      response = new Response(
        'Bad Request',
        400,
        'Invalid Credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    return next();
  }
}

export default RatingValidator;
