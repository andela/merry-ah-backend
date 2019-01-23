import express from 'express';
import ReportController from '../controllers/ReportController';
import ReportValidator from '../middlewares/ReportValidator';
import { TokenAuthenticate } from '../helpers/index';

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
  ReportValidator.ReportInputValidator, ReportController.createReport
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
export default reportRouter;
