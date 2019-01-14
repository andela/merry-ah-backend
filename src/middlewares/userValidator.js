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
    req.check('firstName', 'First Name is required').notEmpty();
    req.check('lastName', 'Last Name is required').notEmpty();
    req.check('username', 'Username is required').notEmpty();
    req.check('userType', 'User type is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Email is not valid').isEmail();
    req.check('password', 'Password is required').notEmpty();
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
    const {
      firstName, lastName, username, email, password, userType,
    } = req.body;
    req.body.email = email.replace(/\s{1,}/g, '').trim().toLowerCase();
    req.body.userType = userType.replace(/\s{1,}/g, '').trim().toLowerCase();
    req.body.password = password.replace(/\s{1,}/g, '').trim().toLowerCase();
    const userTypes = ['user', 'artist'].includes(userType);
    if (!userTypes) {
      response = new Response(
        'Not found',
        404,
        'This user type does not exist'
      );
      return res.status(response.code).json(response);
    }
    let error = false;
    const fieldValues = [
      firstName,
      lastName,
      username,
    ];
    fieldValues.map((fieldValue) => {
      if (fieldValue.trim() === '') {
        error = true;
      }
      return error;
    });
    if (error) {
      response = new Response(
        'Bad request',
        400,
        'Please fill in all fields'
      );
      return res.status(response.code).json(response);
    }
    return next();
  }
}

export default UserValidator;
