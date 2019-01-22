import express from 'express';
import artsRoute from './artsRoute';
import authRouter from './authRouter';
import commentRouter from './commentRouter';
import socialRouter from './socialRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/arts/comments/', commentRouter);
router.use('/auth', socialRouter);

router.use('/articles', artsRoute);

export default router;
