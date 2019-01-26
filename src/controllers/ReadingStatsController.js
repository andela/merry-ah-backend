import models from '../db/models';
import Response from '../helpers/response';

const { ReadingStat } = models;

/** Reading Stat Class */
class ReadingStatsController {
  /**
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @returns {*} - object containing the message, status and code
   * @memberof ReadingStatsController
   */
  static async getStat(req, res) {
    try {
      const read = await ReadingStat
        .findOne({ where: { artId: req.params.id } });
      if (!read) {
        await ReadingStat.create({
          artId: req.params.id,
          visited: 1
        });
        const response = new Response(
          'Ok',
          200,
          'Visited',
        );
        return res.status(response.code).json(response);
      }
      await ReadingStat.update(
        { visited: read.visited + 1 },
        { where: { id: read.id } }
      );
      const response = new Response(
        'Ok',
        200,
        'Updated Visit',
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
}
export default ReadingStatsController;
