import Response from '../helpers/response';

let response;
const reportTypeOptions = ['Spam', 'Indecency', 'Abuse'];
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
    req.check('reportType', 'Report type is required').trim().notEmpty();
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
    const { reportType } = req.body;
    const reportTypes = reportTypeOptions.includes(reportType);
    if (!reportTypes) {
      response = new Response(
        'Not found',
        404,
        `This report type does not exist, should be any of ${reportTypeOptions}`
      );
      return res.status(response.code).json(response);
    }
    next();
  }
}
export default ReportValidator;
