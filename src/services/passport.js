/* eslint-disable no-underscore-dangle */
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleAuth } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import SocialController from '../controllers/SocialsController';


dotenv.config();
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_APP_CALLBACK,
  profileFields: ['id', 'emails', 'name']
}, SocialController.facebookSignin));

passport.use(new GoogleAuth({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_APP_CALLBACK,
}, SocialController.googleSignIn));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_APP_KEY,
  consumerSecret: process.env.TWITTER_APP_SECRET,
  callbackURL: process.env.TWITTER_APP_CALLBACK,
  includeEmail: true
}, SocialController.twitterSignIn));


export default passport;
