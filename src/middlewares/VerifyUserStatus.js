// import Response from '../helpers/response';
// import models from '../db/models';

// const { User } = models;
// /** Users Controller Class */
// class VerifyUserStatus {
//   /**
//    * @static
//    * @param {object} req
//    * @param {object} res
//    * @param {function} next
//    * @memberof VerifyAdmin
//    * @returns {function} next
//    */
//   static async isActive(req, res, next) {
//     const { id } = req.verifyUser;
//     const user = await User.find({
//       where: { id }
//     });
//     if (!user.isActive) {
//       const response = new Response(
//         'Unauthorized',
//         401,
//         'This account has been deactivated',
//       );
//       return res.status(response.code).json(response);
//     }
//     return next();
//   }
// }

// export default VerifyUserStatus;
