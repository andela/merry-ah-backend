import models from '../db/models';
import Response from '../helpers/response';

const { Report, Art, User } = models;

/** Report Controller */
class ReportController {
/**
   * @desc POST /api/v1/art/:id/report
   * @param {object} req
   * @param {object} res
   * @memberof ReportsController
   * @returns {Object} report type and text
   */
  static async createReport(req, res) {
    try {
      const { reportText, reportType } = req.body;
      const artId = await Art.findById(req.params.id);
      if (!artId) {
        const response = new Response(
          'Not Found',
          404,
          'Art not found',
        );
        return res.status(response.code).json(response);
      }
      const report = await Report.create({
        reportText,
        artId: req.params.id,
        userId: req.verifyUser.id,
        reportType: reportType.toLowerCase()
      });
      const response = new Response(
        'Created',
        201,
        'Report as been recieved',
        report
      );
      return res.status(response.code).json(response);
    } catch (err) {
      const response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      return res.status(response.code).json(response);
    }
  }

  /**
   * @desc GET /api/v1/arts/reports
   * @param {object} req
   * @param {object} res
   * @memberof ReportsController
   * @returns {Object} report type and text
   */
  static async getAllReports(req, res) {
    const reports = await Report.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email']
        },
        {
          model: Art,
          as: 'arts',
          attributes: ['title']
        },
      ],
    });
    const response = new Response(
      'Ok',
      200,
      'All reports',
      reports
    );
    return res.status(response.code).json(response);
  }
}
export default ReportController;
