import express from 'express';
import SocialController from '../controllers/SocialsController';
import passport from '../services/passport';

const socialRouter = express.Router();

socialRouter.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));

socialRouter.get('/facebook/callback',
  passport.authenticate('facebook'), SocialController.getToken);
socialRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

socialRouter.get('/google/callback',
  passport.authenticate('google'), SocialController.getToken);

socialRouter.get('/twitter',
  passport.authenticate('twitter', { scope: ['include_email =true'] }));

socialRouter.get('/twitter/callback',
  passport.authenticate('twitter'), SocialController.getToken);

// eslint-disable-next-line import/prefer-default-export
export default socialRouter;
