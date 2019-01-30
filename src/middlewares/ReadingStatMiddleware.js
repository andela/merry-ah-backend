import models from '../db/models';
import Response from '../helpers/response';

const { Art } = models;

/** Reading Stat Class */
class ReadingStatMiddleware {
  /**
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {*} - object containing the message, status and code
   * @memberof ReadingStatMiddleware
   */
  static async getStat(req, res, next) {
    try {
      const read = await Art
        .findOne({ where: { slug: req.params.slug } });
      await Art.update(
        { visited: read.visited + 1 },
        { where: { id: read.id } }
      );
      next();
    } catch (err) {
      const response = new Response(
        'Not ok',
        500,
        `${err}`,
      );
      res.status(response.code).json(response);
    }
  }
}
export default ReadingStatMiddleware;
