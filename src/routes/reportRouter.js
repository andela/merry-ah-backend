import express from 'express';
import TokenAuthenticate from '../helpers/TokenAuthenticate';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import ReportController from '../controllers/ReportController';
import VerifyUserStatus from '../middlewares/VerifyUserStatus';

const reportRouter = express.Router();

reportRouter
  .delete(
    '/:reportId/:reporterId',
    TokenAuthenticate.tokenVerify,
    VerifyUserStatus.isActive,
    VerifyAdmin.isAdmin,
    ReportController.deleteReport
  );
reportRouter
  .put(
    '/:reportId',
    TokenAuthenticate.tokenVerify,
    VerifyUserStatus.isActive,
    VerifyAdmin.isAdmin,
    ReportController.reportArtAction
  );

export default reportRouter;
