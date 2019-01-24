import Response from '../helpers/response';
import bookmarkQuery from '../db/service/rate';

/**
 * A module that validates bookmark values
 * @module validateBookmarkValues
 */
class BookmarkValidator {
  /**
   * @description - Checks the request parameters for art
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof BookmarkValidator
   */
  static async doesArtExist(req, res, next) {
    /** Verify that Art ID exists in db */
    if (!req.validationErrors()) {
      const { artId } = req.params;
      try {
        const count = await bookmarkQuery.getArt(artId);
        if (count) {
          req.check('artId', 'Item/Art ID Does not exist')
            .custom(() => true);
        }
        if (!count) {
          req.check('artId', 'Item/Art ID Does not exist')
            .custom(() => false);
        }
      } catch (error) {
        const response = new Response(
          'Not Ok',
          500,
          `${error}`
        );
        return res.status(response.code).json(response);
      }
    }

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
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

export default BookmarkValidator;
