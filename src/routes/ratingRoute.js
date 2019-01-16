import express from 'express';
import RatingController from '../controllers/RatingController';

const ratingRouter = express.Router();

ratingRouter.post('/rate/:itemId', RatingController.addItemRating);
ratingRouter.get('/rate/:itemId', RatingController.getItemRating);
ratingRouter.get('/rate/:itemId/users/:userId', RatingController.getUserItemRating);

export { ratingRouter };
