import express from 'express';
import artRoute from './artsRoute';
import authRouter from './authRouter';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/articles', artRoute);

export default router;
