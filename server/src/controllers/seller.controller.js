import { validationResult } from 'express-validator';
import Seller from '../models/Seller.js';
import Product from '../models/Product.js';
import { comparePassword } from '../middleware/auth.js';
import { signToken } from '../utils/jwt.js';

export const sellerLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({
    success: false,
    status: 400,
    message: 'Validation error',
    data: null,
    pagination: null,
    error: { code: 'VALIDATION_ERROR', details: errors.array() },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });
  if (!seller) return res.status(401).json({
    success: false,
    status: 401,
    message: 'Invalid credentials',
    data: null,
    pagination: null,
    error: { code: 'UNAUTHORIZED' },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
  const ok = await comparePassword(password, seller.password);
  if (!ok) return res.status(401).json({
    success: false,
    status: 401,
    message: 'Invalid credentials',
    data: null,
    pagination: null,
    error: { code: 'UNAUTHORIZED' },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
  const token = signToken({ id: seller._id, role: 'seller' });
  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Login successful',
    data: { accessToken: token, role: 'seller' },
    pagination: null,
    error: null,
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
};

export const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({
    success: false,
    status: 400,
    message: 'Validation error',
    data: null,
    pagination: null,
    error: { code: 'VALIDATION_ERROR', details: errors.array() },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });

  const { name, description, brands } = req.body;
  const sellerId = req.user.id;

  const product = await Product.create({ seller: sellerId, name, description, brands });
  return res.status(201).json({
    success: true,
    status: 201,
    message: 'Product created',
    data: { _id: product._id },
    pagination: null,
    error: null,
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
};

export const listMyProducts = async (req, res) => {
  const sellerId = req.user.id;
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Product.find({ seller: sellerId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments({ seller: sellerId }),
  ]);

  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Products fetched',
    data: items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    error: null,
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
};

export const deleteMyProduct = async (req, res) => {
  const productId = req.params.id;
  const sellerId = req.user.id;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({
    success: false,
    status: 404,
    message: 'Product not found',
    data: null,
    pagination: null,
    error: { code: 'NOT_FOUND' },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
  if (product.seller.toString() !== sellerId) {
    return res.status(403).json({
      success: false,
      status: 403,
      message: 'You can delete only your own product',
      data: null,
      pagination: null,
      error: { code: 'FORBIDDEN' },
      meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
    });
  }
  await product.deleteOne();
  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Product deleted',
    data: { _id: productId },
    pagination: null,
    error: null,
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
};
