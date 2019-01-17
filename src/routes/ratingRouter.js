import express from 'express';
import RatingController from '../controllers/RatingController';
import RatingValidator from '../middlewares/RatingValidator';

const ratingRouter = express.Router();

ratingRouter.post(
  '/:artId',
  RatingValidator.genericRatingValidator,
  RatingValidator.addRatingValidator,
  RatingController.addItemRating
);
ratingRouter.get(
  '/:artId',
  RatingValidator.genericRatingValidator,
  RatingController.getItemRating
);
ratingRouter.get(
  '/:artId/user',
  RatingValidator.genericRatingValidator,
  RatingController.getUserItemRating
);
export default ratingRouter;
