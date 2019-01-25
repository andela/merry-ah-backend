import Response from '../helpers/response';

/** Artist Verification checker class */
class ArtistVerify {
  /**
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @memberof ParamsChecker
     * @returns {function} next
     */
  static userTypeChecker(req, res, next) {
    const { userType } = req.verifyUser;

    if (userType === 'artist') {
      return next();
    }

    const response = new Response(
      'Forbidden',
      403,
      'Sorry. You are unauthorised to perform this action'
    );
    return res.status(response.code).json(response);
  }
}

export default ArtistVerify;
