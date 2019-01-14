import models from '../db/models';
import Response from '../helpers/response';

let response;
/**
 * A module that checks if email already exists at sign up
 * @module emailCheck
 */

/**
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next function to be executed
 * @return {void}
 */
const emailCheck = async (req, res, next) => {
  const { email } = req.body;

  const emailExist = await models.User.find({
    where: {
      email,
    },
  });
  if (emailExist) {
    response = new Response(
      'Unsuccessful',
      409,
      'Email already exists. Input a different email'
    );
    return res.status(response.code).json(response);
  }
  if (!emailExist) next();
};

export default emailCheck;
