import express from 'express';
import artsRoute from './artsRoute';
import authRouter from './authRouter';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/articles', artsRoute);

export default router;
