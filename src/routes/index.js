import express from 'express';
import { authRouter } from './usersRoute';
import artRoute from './artsRoute';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/articles', artRoute);

export default router;
