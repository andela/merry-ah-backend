import Response from '../helpers/response';

let response;
/**
 * A module that checks if email already exists at sign up
 * @module validateUserInputs
 */
class ReportValidator {
  /**
   * @description - Checks the request parameters for report
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof ReportValidator
   */
  static ReportInputValidator(req, res, next) {
    req.check('reportText', 'Report text is required').trim().notEmpty();
    req.check('reportText', 'Minimum length is 10 characters')
      .isLength({ min: 10 });
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      response = new Response(
        'Bad Request',
        400,
        'Fields cannot be empty',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    next();
  }
}
export default ReportValidator;
