import Response from '../helpers/response';

let response;
/** Params checker class */
class ParamsChecker {
  /**
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @memberof ParamsChecker
     * @returns {function} next
     */
  static idChecker(req, res, next) {
    const { userId, artId } = req.params;
    const validId = /^[0-9]+$/;

    const checkParam = (param) => {
      if (!param.match(validId)) {
        response = new Response(
          'Bad Request',
          400,
          'ID can only be a number'
        );
        return res.status(response.code).json(response);
      }
      return next();
    };
    if (userId) checkParam(userId);
    if (artId) checkParam(artId);
  }
}

export default ParamsChecker;
