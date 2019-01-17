import express from 'express';
import authRouter from './authRouter';
import ratingRouter from './ratingRouter';
import TokenAuthenticate from '../helpers/TokenAuthenticate';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/rate', TokenAuthenticate.tokenVerify, ratingRouter);

export default router;
