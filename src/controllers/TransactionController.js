import Response from '../helpers/response';
import transaction from '../db/service/transaction';

/** Transaction Controller Class */
class TransactionController {
  /**
   * @static
   * @desc POST /api/v1/transaction/purchase/:item
   * @param {object} req
   * @param {object} res
   * @memberof TransactionController
   * @returns {object} res
   */
  static async purchaseItem(req, res) {
    const { artId } = req.params;
    const { artistId, price } = req.body;
    const { id } = req.verifyUser;
    try {
      const purchaseItemResponse = await transaction
        .saveTransaction(artId, artistId, id, price);
      if (purchaseItemResponse) {
        const response = new Response(
          'Created',
          201,
          'Art has been purchased',
          purchaseItemResponse
        );
        return res.status(response.code).json(response);
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

  /**
     * @static
     * @desc GET /api/v1/transaction/receipt/:item
     * @param {object} req
     * @param {object} res
     * @memberof TransactionController
     * @returns {object} res
     */
  static async getItemReceipt(req, res) {
    const { artId } = req.params;

    try {
      const getItemReceiptResponse = await transaction.getItemReceipt(artId);
      if (getItemReceiptResponse) {
        const response = new Response(
          'Ok',
          200,
          'Receipt was found',
          getItemReceiptResponse
        );
        return res.status(response.code).json(response);
      }
    } catch (error) {
      const response = new Response(
        'Not Ok',
        500,
        `${error}`
      );
      return res.status(response.code).json(response);
    }
  }

  /**
     * @static
     * @desc GET /api/v1/transaction
     * @param {object} req
     * @param {object} res
     * @memberof TransactionController
     * @returns {object} res
     */
  static async getTransactions(req, res) {
    const { id } = req.verifyUser;
    try {
      const allUserTransactions = await transaction.getTransactions(id);
      if (allUserTransactions) {
        const response = new Response(
          'Ok',
          200,
          `${allUserTransactions.length} transaction(s) found`,
          allUserTransactions
        );
        return res.status(response.code).json(response);
      }
      if (!allUserTransactions) {
        const response = new Response(
          'Not found',
          404,
          `${allUserTransactions.length} transaction(s) found`,
          allUserTransactions
        );
        return res.status(response.code).json(response);
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
}
export default TransactionController;
