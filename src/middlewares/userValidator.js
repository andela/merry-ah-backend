import Response from '../helpers/response';

const minPassLen = 5;
let response;
/**
 * A module that checks if email already exists at sign up
 * @module validateUserInputs
 */
class UserValidator {
  /**
   * @description - Checks the request parameters for user reg
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof UserValidator
   */
  static UserSignUpValidator(req, res, next) {
    req.check('firstName', 'First Name is required').trim().notEmpty();
    req.check('lastName', 'Last Name is required').trim().notEmpty();
    req.check('username', 'Username is required').trim().notEmpty();
    req.check('email', 'Email is required').trim().notEmpty();
    req.check('email', 'Email is not valid').trim().isEmail();
    req.check('password', 'Password is required').trim().notEmpty();
    req.check('password', 'Minimum password length is 5 characters')
      .isLength({ min: minPassLen });
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
    const { email } = req.body;
    req.body.email = email.replace(/\s{1,}/g, '').trim().toLowerCase();
    return next();
  }
}

export default UserValidator;
