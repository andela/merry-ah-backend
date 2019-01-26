import express from 'express';
import ReportController from '../controllers/ReportController';
import ReportValidator from '../middlewares/ReportValidator';
import CheckArt from '../middlewares/CheckArt';
import { TokenAuthenticate } from '../helpers/index';
import VerifyAdmin from '../middlewares/VerifyAdmin';
import VerifyUserStatus from '../middlewares/VerifyUserStatus';

const reportRouter = express.Router();
/**
   * @swagger
   * /api/v1/arts/:id/report:
   *   post:
   *     description: Create a report
   *     produces:
   *       - application/json
   *     security:
   *       - token: []
   *     parameters:
   *       - name: reportText
   *         description: Report comment.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: reportType
   *         description: Type of report.
   *         in: formData
   *         required: true
   *         type: string
   */
reportRouter.post(
  '/:id/report', TokenAuthenticate.tokenVerify,
  CheckArt.checkArt,
  ReportValidator.ReportInputValidator,
  ReportController.createReport
);
/**
   * @swagger
   * /api/v1/arts/reports:
   *   get:
   *     description: Returns all reports
   *     responses:
   *       200:
   *       description: All reports
   *       schema:
   *           type: object
   */
reportRouter.get(
  '/reports', ReportController.getAllReports
);
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
