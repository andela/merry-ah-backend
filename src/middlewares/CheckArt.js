
import models from '../db/models';
import Response from '../helpers/response';

const { Art } = models;
/** CheckArt Middleware */
class CheckArtMiddleware {
  /**
 * Check Art
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @memberof CheckArtMiddleware
 * @returns {object} error object if artist id does not exist
 */
  static async checkArt(req, res, next) {
    const artId = await Art.findById(req.params.id);
    if (!artId) {
      const response = new Response(
        'Not Found',
        404,
        'Art not found',
      );
      return res.status(response.code).json(response);
    }
    next();
  }
}
export default CheckArtMiddleware;
