import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export const productRoute = Router();
productRoute.get('/', ProductController.getProducts);