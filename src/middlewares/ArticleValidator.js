import Response from '../helpers/response';

/**
 * A middleware that checks the validity of a new article request
 * @module validateArticleInputs
 */
class ArticleValidator {
  /**
   * @description - Checks the request parameters for user reg
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - error response or next()
   * @static
   * @memberof CommentValidator
   */
  static createArticleValidator(req, res, next) {
    req.check('title', 'Title is required').trim().notEmpty();
    req.check('categoryId', 'Category is required & numeric').isNumeric();
    req.check('description', 'Description should be longer').trim().notEmpty()
      .isLength({ min: 15 });

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
        'Bad Request',
        400,
        'Validation Errors Occurred',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    return next();
  }
}

export default ArticleValidator;
