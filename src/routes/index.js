import express from 'express';
import authRouter from './usersRoute';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
