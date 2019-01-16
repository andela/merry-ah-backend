import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRouter from './authRouter';

const router = express.Router();
const swaggerSpec = swaggerJSDoc(require('../utils/swaggerConfig')
  .options);

router.use('/auth', authRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;
