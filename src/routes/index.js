import express from 'express';
import authRouter from './authRouter';
import commentRouter from './commentRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/articles/comments/', commentRouter);

export default router;
