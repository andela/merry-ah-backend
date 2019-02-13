import Response from '../helpers/response';

/** Users Controller Class */
class VerifyAdmin {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @memberof VerifyAdmin
   * @returns {function} next
   */
  static isAdmin(req, res, next) {
    const { userType } = req.verifyUser;
    if (userType !== 'admin') {
      const response = new Response(
        'Unauthorized',
        401,
        'You are not authorized to access this route',
      );
      return res.status(response.code).json(response);
    }
    return next();
  }
}

export default VerifyAdmin;
