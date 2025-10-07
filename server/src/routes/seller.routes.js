import { Router } from 'express';
import { body, param } from 'express-validator';
import { sellerLogin, addProduct, listMyProducts, deleteMyProduct } from '../controllers/seller.controller.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  sellerLogin
);

router.post(
  '/products',
  authenticate,
  requireRole('seller'),
  [
    body('name').isString().notEmpty(),
    body('description').optional().isString(),
    body('brands').isArray({ min: 1 }),
    body('brands.*.name').isString().notEmpty(),
    body('brands.*.detail').optional().isString(),
    body('brands.*.image').optional().isString(),
    body('brands.*.price').isFloat({ gt: -1 }),
  ],
  addProduct
);

router.get(
  '/products',
  authenticate,
  requireRole('seller'),
  listMyProducts
);

router.delete(
  '/products/:id',
  authenticate,
  requireRole('seller'),
  [param('id').isMongoId()],
  deleteMyProduct
);

export default router;
