import express from 'express';
import authRouter from './authRouter';
import ratingRouter from './ratingRouter';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import commentRouter from './commentRouter';
import socialRouter from './socialRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/rate', TokenAuthenticate.tokenVerify, ratingRouter);
router.use('/arts/comments/', commentRouter);
router.use('/auth', socialRouter);

export default router;
