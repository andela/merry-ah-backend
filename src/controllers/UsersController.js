/* eslint-disable valid-jsdoc */
import models from '../db/models';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import Response from '../helpers/response';
import { passwordHash, comparePassword } from '../helpers/passwordHash';
import EmailNotificationAPI from '../helpers/EmailNotificationAPI';
import basePath from '../helpers/basepath';

const { User, Profile } = models;


const tokenExpireTime = '10hr';
const salt = 10;
/** Users Controller Class */
class UsersController {
  /**
   * @static
   * @desc POST /api/v1/auth/signup
   * @param {object} req
   * @param {object} res
   * @memberof UsersController
   * @returns user details
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
        id, username: registeredUsername, email: registeredEmail,
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
      const path = basePath(req);
      const recipient = registeredEmail;
      const subject = 'Email Verification';
      const message = `<h1>Verification link</h1><br>
        <a href='${path}/api/v1/auth/user?token=${token}'>
        <button style='font-size: 20px; background: orange;'>verify</button>
        </a><br>
        <p>Kindly click on the button above to verify your email. 
        This link will <strong>expire in 10hrs
        </strong></p>
        `;
      const sendVerificationLink = new EmailNotificationAPI({
        recipient,
        subject,
        message,
      });
      const sendMail = await sendVerificationLink.sendEmail();
      if (sendMail !== 'Message sent') {
        const response = new Response(
          'Bad request',
          400,
          'There was a problem sending',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Ok',
        201,
        'User created successfully and verification link sent to your Email',
        { token }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @desc POST /api/v1/auth/signin
   * @param {object} req
   * @param {object} res
   * @memberof UsersController
   * @returns user token
   */
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const response = new Response(
          'Bad Request',
          400,
          'Invalid Credentials'
        );
        return res.status(response.code).json(response);
      }
      if (!comparePassword(password, user.password)) {
        const response = new Response(
          'Bad Request',
          400,
          'Invalid Credentials'
        );
        return res.status(response.code).json(response);
      }
      const {
        id, username, email: userEmail, signUpType
      } = user;
      const userDetails = {
        id, username, userEmail, signUpType
      };
      const token = await TokenAuthenticate
        .generateToken(userDetails, tokenExpireTime);
      const response = new Response(
        'Ok',
        200,
        'User logged in successfully',
        { token }
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @desc POST /api/v1/auth/forgot-password
   * @param {object} req
   * @param {object} res
   * @memberof UsersController
   * @returns user reset password token
   */
  static async forgotPassword(req, res) {
    try {
      const { checkEmail } = req;
      const { email: recipient, username } = checkEmail;
      const userDetails = { email: recipient, username };
      const token = await TokenAuthenticate.generateToken(userDetails, '1hr');
      const subject = 'Reset Password';
      const path = basePath(req);
      const linkPath = `${path}/api/v1/auth/forgot-password?token=${token}`;
      const message = `<h3>Dear ${username}</h3><br>
      <a href='${linkPath}'>
      <button style='font-size: 20px; background: orange;'>
        Reset Password
      </button>
      </a><br>
      <p>Kindly click on the button above to reset your password. 
      This link will <strong>expire in 1 hour
      </strong></p>
      `;
      const sendVerificationLink = new EmailNotificationAPI({
        recipient,
        subject,
        message,
      });
      const sendMail = await sendVerificationLink.sendEmail();
      if (sendMail !== 'Message sent') {
        const response = new Response(
          'Bad request',
          400,
          'There was a problem sending',
        );
        return res.status(response.code).json(response);
      }
      const response = new Response(
        'Ok',
        200,
        'Email sent successfully',
        { token },
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Internal server error',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @static
   * @desc POST /api/v1/auth/forgot-password
   * @param {object} req
   * @param {object} res
   * @memberof UsersController
   * @returns successful pasword reset
   */
  static async completeForgotPassword(req, res) {
    const { email } = req;
    const { password } = req.body;
    const hashPassword = passwordHash(password, 10);

    const updatePassword = await User.update({
      password: hashPassword,
    },
    {
      where: {
        email,
      }
    });

    if (!updatePassword) {
      const response = new Response(
        'Bad Request',
        400,
        'Unable to reset password',
      );
      return res.status(response.code).json(response);
    }
    const response = new Response(
      'Ok',
      200,
      'Password reset successful',
    );
    return res.status(response.code).json(response);
  }
}

export default UsersController;
