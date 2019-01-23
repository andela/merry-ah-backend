/* eslint-disable max-len */
import express from 'express';
import UserController from '../controllers/UsersController';
import emailCheck from '../middlewares/emailCheck';
import UserValidator from '../middlewares/UsersValidator';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import UserMiddleware from '../middlewares/UserMiddleware';

const authRouter = express.Router();
/**
   * @swagger
   * /api/v1/auth/signup:
   *   post:
   *     description: Signup to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User's email.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: userType
   *         description: User's type.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: signUpType
   *         description: User's type.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       400:
   *         description: There was a problem sending
   *         schema:
   *           type: object
   *       200:
   *         description: User created successfully and verification link sent to your Email
   *         schema:
   *           type: object
   */
authRouter
  .post('/signup',
    UserValidator.userSignUpValidator,
    emailCheck,
    UserController.signUp);
/**
   * @swagger
   * /api/v1/auth/forgot-password:
   *   post:
   *     description: Forget Password
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User's email.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       400:
   *         description: There was a problem sending
   *         schema:
   *           type: object
   *       200:
   *         description: Email sent successfully
   *         schema:
   *           type: object
   */
authRouter.post(
  '/forgot-password',
  UserMiddleware.VerifyEmail,
  UserController.forgotPassword
);
/**
   * @swagger
   * /api/v1/auth/forgot-password:
   *   put:
   *     description: Update password
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User's email.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       400:
   *         description: Unable to reset password
   *         schema:
   *           type: object
   *       200:
   *         description: Password reset successful
   *         schema:
   *           type: object
   */
authRouter.put(
  '/forgot-password',
  TokenAuthenticate.tokenVerify,
  UserMiddleware.validatePassword,
  UserController.completeForgotPassword,
);
/**
   * @swagger
   * /api/v1/auth/signin:
   *   post:
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User's email.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       400:
   *         description: Invalid Credentials
   *         schema:
   *           type: object
   *       200:
   *         description: User logged in successfully
   *         schema:
   *           type: object
   */
authRouter.post(
  '/signin',
  UserValidator.UserSignInValidator,
  UserController.signIn
);
authRouter
  .get('/verify', TokenAuthenticate.tokenVerify, UserController.verifyEmail);

export default authRouter;
