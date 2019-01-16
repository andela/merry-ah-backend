import express from 'express';
import ArtController from '../controllers/ArtsController';
import { TokenAuthenticate } from '../helpers/index';

const authRouter = express.Router();

authRouter.post('/', TokenAuthenticate.tokenVerify, ArtController.create);

export default authRouter;
