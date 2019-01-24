import Response from '../helpers/response';

let response;
/**
 * A module that checks if email already exists at sign up
 * @module validateCommentInputs
 */
class CommentValidator {
  /**
   * @description - Checks the request parameters for user reg
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof UserValidator
   */
  static createCommentValidator(req, res, next) {
    req.check('body', 'Comment body is required').trim().notEmpty();
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      response = new Response(
        'Bad Request',
        400,
        'Invalid credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    return next();
  }
}

export default CommentValidator;
