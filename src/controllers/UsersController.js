import models from '../db/models';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import Response from '../helpers/response';
import passwordHash from '../helpers/passwordHash';
import EmailNotificationAPI from '../helpers/EmailNotificationAPI';

const { User, Profile } = models;
let response;
const tokenExpireTime = '10hr';
const salt = 10;
/**
 * @description Defines the actions to for the users endpoints
 * @class UserController
 */
class UsersController {
  /**
  * @param {object} req -The HTTP response
  * @param {object} res -The HTTP request
  * @returns {function} next().
 */
  static async signUp(req, res) {
    const defaultstatus = 0;

    const signUpType = 'local';
    try {
      const {
        firstName, lastName, email, username, password, userType
      } = req.body;
      const { bio } = req.body || null;
      const { imgURL } = req.body || null;
      const hash = await passwordHash(password, salt);

      const signup = await User
        .create({
          email,
          username,
          password: hash,
          userType,
          signUpType,
          isVerified: defaultstatus
        });
      const {
        id,
        username: registeredUsername,
        email: registeredEmail,
        userType: userSignupType
      } = signup.dataValues;
      await Profile
        .create({
          userId: id,
          firstName,
          lastName,
          bio,
          imgURL,
        });
      const userDetails = {
        id, registeredUsername, registeredEmail, userSignupType
      };
      const token = await TokenAuthenticate
        .generateToken(userDetails, tokenExpireTime);
      const recipient = registeredEmail;
      const subject = 'Email Verification';
      const message = `<h1>Verification link</h1><br>
      <a href='http://localhost:9000/api/v1/user?token=${token}'>
      <button style='font-size: 20px; background: orange;'>
      verify</button></a><br>
      <p>Kindly click on the button above to verify your email. 
      This link will <strong>expire in 10hrs</strong></p>
        `;
      const sendVerificationLink = new EmailNotificationAPI({
        recipient,
        subject,
        message,
      });
      await sendVerificationLink.sendEmail();
      response = new Response(
        'Ok',
        201,
        'User created successfully and verification link sent to your Email',
        { token }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }
}

export default UsersController;
