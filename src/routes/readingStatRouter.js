import express from 'express';
import ReadingStatController from '../controllers/ReadingStatsController';
import CheckArt from '../middlewares/CheckArt';

const readingStatRouter = express.Router();

readingStatRouter.get(
  '/:id/read', CheckArt.checkArt, ReadingStatController.getStat
);
export default readingStatRouter;
