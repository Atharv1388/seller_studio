import { Router } from 'express';
import { body } from 'express-validator';
import { adminLogin, createSeller, listSellers } from '../controllers/admin.controller.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  adminLogin
);

router.post(
  '/sellers',
  authenticate,
  requireRole('admin'),
  [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    body('mobile').isString().notEmpty(),
    body('country').isString().notEmpty(),
    body('state').isString().notEmpty(),
    body('skills').isArray().withMessage('Skills must be an array'),
    body('password').isLength({ min: 6 }),
  ],
  createSeller
);

router.get(
  '/sellers',
  authenticate,
  requireRole('admin'),
  listSellers
);

export default router;
