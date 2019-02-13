import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import artsRoute from './artsRoute';
import authRouter from './authRouter';
import commentReaction from './commentReactionRouter';
import ratingRouter from './ratingRouter';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import userRouter from './userRouter';
import commentRouter from './commentRouter';
import socialRouter from './socialRouter';
import reportRouter from './reportRouter';
import bookmarkRouter from './bookmarkRouter';
import transactionRouter from './transactionRouter';

const router = express.Router();
const swaggerSpec = swaggerJSDoc(require('../utils/swaggerConfig')
  .options);

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use(
  '/rate',
  TokenAuthenticate.tokenVerify,
  ratingRouter
);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use('/arts', artsRoute);
router.use('/artsreport', reportRouter);
router.use('/arts/comments/', [commentRouter, commentReaction]);
router.use('/auth', socialRouter);

router.use(
  '/bookmark',
  TokenAuthenticate.tokenVerify,
  bookmarkRouter
);
router.use('/users', userRouter);
router.use('/transaction', TokenAuthenticate.tokenVerify, transactionRouter);

export default router;
