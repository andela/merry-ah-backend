import express from 'express';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRoute = express.Router();

categoriesRoute.get('/', CategoriesController.getCategories);

export default categoriesRoute;
