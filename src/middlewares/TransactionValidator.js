import Response from '../helpers/response';
import txnQuery from '../db/service/rate';
import transaction from '../db/service/transaction';

/**
 * A module that validates transaction details
 * @module validateTransaction
 */
class TransactionValidator {
  /**
   * @description - Checks the request parameters for transactions
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof TransactionValidator
   */
  static async genericTransactionValidator(req, res, next) {
    let artObj;

    /** Verify that Art exists in db */
    if (!req.validationErrors()) {
      const { artId } = req.params;
      try {
        artObj = await txnQuery.getArt(artId);
        if (!artObj) {
          req.check('artId', 'Item/Art ID Does not exist')
            .custom(() => false);
        }
      } catch (error) {
        const response = new Response(
          'Internal Server Error',
          500,
          `${error}`
        );
        return res.status(response.code).json(response);
      }
    }

    /** Check Availability of product */
    if (!req.validationErrors() && artObj) {
      const { status } = artObj;
      const isAvailable = status === false;
      try {
        req.check('verifyArt', 'Art is not available for sale')
          .custom(() => !isAvailable);
      } catch (error) {
        const response = new Response(
          'Internal Server Error',
          500,
          `${error}`
        );
        return res.status(response.code).json(response);
      }
    }

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
        'Bad Request',
        400,
        'Invalid Credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    return next();
  }

  /**
   * @description - Validates transactions on receipt generation
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof TransactionValidator
   */
  static async getItemReceiptValidator(req, res, next) {
    let artObj;
    const { artId } = req.params;

    /** Verify that Item has been sold */
    if (!req.validationErrors()) {
      try {
        artObj = await txnQuery.getArt(artId);
        if (artObj) {
          const { status } = artObj;
          const isAvailable = status === true;
          req.check('artId', 'This Item is still available for sale')
            .custom(() => !isAvailable);
        }
        if (!artObj) {
          req.check(
            'artId',
            'There is no receipt for a non-existent artwork'
          ).custom(() => false);
        }
      } catch (error) {
        const response = new Response(
          'Internal Server Error',
          500,
          `${error}`
        );
        return res.status(response.code).json(response);
      }
    }

    /** Check Availability of Receipt */
    if (!req.validationErrors() && artObj) {
      const receiptObj = await transaction.getItemReceipt(artId);
      let isAvailable = false;
      if (receiptObj) {
        isAvailable = true;
      }
      try {
        req.check('verifyReceipt', 'Art is not available for sale')
          .custom(() => isAvailable);
      } catch (error) {
        const response = new Response(
          'Internal Server Error',
          500,
          `${error}`
        );
        return res.status(response.code).json(response);
      }
    }

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
        'Bad Request',
        400,
        'Invalid Credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    return next();
  }

  /**
   * @description - Validates transactions on save
   * @param  {Object} req - request
   * @param  {object} res - response
   * @param {Object} next - Call back function
   * @return {object} - status code and error message or next()
   * @static
   * @memberof TransactionValidator
   */
  static async saveTransactionValidator(req, res, next) {
    /** Check that Artist cant buy his Item */
    if (!req.validationErrors()) {
      try {
        const { artId } = req.params;
        const { id } = req.verifyUser;
        const artObj = await txnQuery.getArt(artId);
        if (artObj) {
          const { artistId } = artObj;
          const isArtistItem = artistId === id;
          req.check('artId', 'Artist Can not buy his own Item')
            .custom(() => !isArtistItem);
        }

        /** Add artist Id and amount of art to request body for controller */
        if (artObj) {
          req.body.price = artObj.price;
          req.body.artistId = artObj.artistId;
        }
      } catch (error) {
        const response = new Response(
          'Internal Server Error',
          500,
          `${error}`
        );
        return res.status(response.code).json(response);
      }
    }

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      const response = new Response(
        'Bad Request',
        400,
        'Invalid Credentials',
        validationErrors
      );
      return res.status(response.code).json(response);
    }
    return next();
  }
}

export default TransactionValidator;
