/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import models from '../db/models';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import Response from '../helpers/response';

const { User, Profile } = models;
const tokenExpireTime = '10hr';
let response;
/** SocialController Class */
class SocialController {
  /**
   * @static
   *
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile - information from facebook
   * @param {*} done - returns the user object
   * @returns {*} - passes execution to next middleware on route path
   * @memberof SocialAuthController
   */
  static facebookSignin(accessToken, refreshToken, profile, done) {
    const {
      first_name, middle_name, email
    } = profile._json;
    const bio = profile._json.bio || null;
    const imgURL = profile._json.imgURL || null;
    User.findOrCreate({
      where: { email },
      defaults: {
        username: `${first_name} ${middle_name}`,
        email,
        signUpType: 'social',
        userType: null,
        isVerified: true,
        password: null,
      }
    }).spread((user, isCreated) => {
      const userDetails = user.dataValues;
      if (isCreated) {
        Profile.create({
          userId: userDetails.id,
          firstName: first_name,
          lastName: middle_name,
          bio,
          imgURL,
        });
      }
      userDetails.newUser = isCreated;
      return done(null, userDetails);
    });
  }

  /**
   * @static
   *
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile - information from google
   * @param {*} done - returns the user object
   * @returns {*} - passes execution to next middleware on route path
   * @memberof SocialAuthController
   */
  static googleSignIn(accessToken, refreshToken, profile, done) {
    const {
      displayName, emails,
    } = profile;
    const bio = profile.bio || null;
    const imgURL = profile.imgURL || null;
    User.findOrCreate({
      where: { email: emails[0].value },
      defaults: {
        username: displayName,
        email: emails[0].value,
        signUpType: 'social',
        userType: null,
        isVerified: true,
        password: null,
      }
    }).spread((user, isCreated) => {
      const userDetails = user.dataValues;
      if (isCreated) {
        Profile.create({
          userId: userDetails.id,
          firstName: displayName.split(' ')[0],
          lastName: displayName.split(' ')[1],
          bio,
          imgURL,
        });
      }
      userDetails.newUser = isCreated;
      return done(null, userDetails);
    });
  }

  /**
   * @static
   *
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile - information from twitter
   * @param {*} done - returns the user object
   * @returns {*} - passes execution to next middleware on route path
   * @memberof SocialAuthController
   */
  static twitterSignIn(accessToken, refreshToken, profile, done) {
    const {
      displayName, emails,
    } = profile;
    const bio = profile.bio || null;
    const imgURL = profile.imgURL || null;
    User.findOrCreate({
      where: { email: emails[0].value },
      defaults: {
        username: displayName,
        email: emails[0].value,
        signUpType: 'social',
        userType: null,
        isVerified: true,
        password: null,
      }
    }).spread((user, isCreated) => {
      const userDetails = user.dataValues;
      if (isCreated) {
        Profile.create({
          userId: userDetails.id,
          firstName: displayName.split(' ')[0],
          lastName: displayName.split(' ')[1],
          bio,
          imgURL,
        });
      }
      userDetails.newUser = isCreated;
      return done(null, userDetails);
    });
  }

  /**
   * @static
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} - object containing a message and token
   * @memberof SocialAuthController
   *
   */
  static getToken(req, res) {
    const {
      id, username, email, signUpType, newUser,
    } = req.user;
    const payload = {
      id, username, email, signUpType,
    };
    const token = TokenAuthenticate.generateToken(payload, tokenExpireTime);
    if (newUser) {
      response = new Response(
        'Ok',
        201,
        'User logged in successfully',
        { token }
      );
      return res.status(response.code).json(response);
    }
    response = new Response(
      'Ok',
      200,
      `Welcome ${username}`,
      { token }
    );
    return res.status(response.code).json(response);
  }
}
export default SocialController;
