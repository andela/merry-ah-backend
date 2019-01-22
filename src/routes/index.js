import express from 'express';
import authRouter from './authRouter';
import socialRouter from './socialRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/auth', socialRouter);

export default router;
