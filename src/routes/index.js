import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import artsRoute from './artsRoute';
import authRouter from './authRouter';
import ratingRouter from './ratingRouter';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import userRouter from './userRouter';
import commentRouter from './commentRouter';
import socialRouter from './socialRouter';
import reportRouter from './reportRouter';
import bookmarkRouter from './bookmarkRouter';

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
router.use('/arts/comments/', commentRouter);
router.use('/auth', socialRouter);

router.use(
  '/bookmark',
  TokenAuthenticate.tokenVerify,
  bookmarkRouter
);

export default router;
