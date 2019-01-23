import Response from '../helpers/response';

const minPassLen = 5;
const minBioLen = 25;
const userTypeOptions = ['user', 'artist'];
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
  static userSignUpValidator(req, res, next) {
    req.check('firstName', 'First Name is required').trim().notEmpty();
    req.check('lastName', 'Last Name is required').trim().notEmpty();
    req.check('username', 'Username is required').trim().notEmpty();
    req.check('userType', 'User type is required').trim().notEmpty();
    req.check('email', 'Email is required').trim().notEmpty();
    req.check('email', 'Email is not valid').trim().isEmail();
    req.check('password', 'Password is required').trim().notEmpty();
    req.check('password', 'Minimum password length is 5 characters')
      .isLength({ min: minPassLen });
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
        'Bad Request',
        400,
        'Invalid credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    const { userType } = req.body;
    const userTypes = userTypeOptions.includes(userType);
    if (!userTypes) {
      const response = new Response(
        'Not found',
        404,
        'This user type does not exist'
      );
      return res.status(response.code).json(response);
    }
    const { email } = req.body;
    req.body.email = email.replace(/\s{1,}/g, '').trim().toLowerCase();
    return next();
  }

  /**
   * @description - Checks the request parameters for user profile
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof UserValidator
   */
  static userProfileValidator(req, res, next) {
    req.check('bio', 'Biography cannot be empty').trim().notEmpty();
    req.check('bio', 'Biography should be more than 5 words')
      .isLength({ min: minBioLen });
    req.check('imgURL', 'imgURL is cannot be empty').trim().notEmpty();
    req.check('imgURL', 'Only Jpeg, Png or Gif is accepted image format')
      .isImage(req.body.imgURL);
    req.check('userType', 'userType cannot be empty').trim().notEmpty();

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
        'Bad Request',
        400,
        'Invalid credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    const { userType } = req.body;
    const userTypes = userTypeOptions.includes(userType);
    if (!userTypes) {
      const response = new Response(
        'Not found',
        404,
        'This user type does not exist'
      );
      return res.status(response.code).json(response);
    }
    return next();
  }

  /**
   * @description - Checks the request parameters for user login
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof UserValidator
   */
  static UserSignInValidator(req, res, next) {
    req.check('email', 'Email is required').trim().notEmpty();
    req.check('email', 'Email is not valid').trim().isEmail();
    req.check('password', 'Password is required').trim().notEmpty();
    req.check('password', 'Minimum password length is 5 characters')
      .isLength({ min: minPassLen });
    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
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

export default UserValidator;
