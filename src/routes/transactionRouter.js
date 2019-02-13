import express from 'express';
import TransactionController from '../controllers/TransactionController';
import TransactionValidator from '../middlewares/TransactionValidator';
import ParamChecker from '../middlewares/ParamsChecker';

const transactionRouter = express.Router();

transactionRouter.get(
  '/',
  TransactionController.getTransactions
);
transactionRouter.post(
  '/purchase/:artId',
  ParamChecker.idChecker,
  TransactionValidator.genericTransactionValidator,
  TransactionValidator.saveTransactionValidator,
  TransactionController.purchaseItem
);
transactionRouter.get(
  '/receipt/:artId',
  ParamChecker.idChecker,
  TransactionValidator.getItemReceiptValidator,
  TransactionController.getItemReceipt
);

export default transactionRouter;
