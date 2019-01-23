import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import artsRoute from './artsRoute';
import authRouter from './authRouter';
import userRouter from './userRouter';
import commentRouter from './commentRouter';
import socialRouter from './socialRouter';

const router = express.Router();
const swaggerSpec = swaggerJSDoc(require('../utils/swaggerConfig')
  .options);

router.use('/auth', authRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use('/arts', artsRoute);
router.use('/arts/comments/', commentRouter);
router.use('/auth', socialRouter);

router.use('/users', userRouter);

router.use('/users', userRouter);

export default router;
