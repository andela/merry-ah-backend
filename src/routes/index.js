import express from 'express';
import authRouter from './authRouter';
import artsRoute from './artsRoute';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/articles', artsRoute);

export default router;
