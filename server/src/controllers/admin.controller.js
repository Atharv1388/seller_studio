import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import Seller from '../models/Seller.js';
import { signToken } from '../utils/jwt.js';
import { hashPassword, comparePassword } from '../middleware/auth.js';

export const adminLogin = async (req, res) => {
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
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({
    success: false,
    status: 401,
    message: 'Invalid credentials',
    data: null,
    pagination: null,
    error: { code: 'UNAUTHORIZED' },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
  const ok = await comparePassword(password, admin.password);
  if (!ok) return res.status(401).json({
    success: false,
    status: 401,
    message: 'Invalid credentials',
    data: null,
    pagination: null,
    error: { code: 'UNAUTHORIZED' },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
  const token = signToken({ id: admin._id, role: 'admin' });
  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Login successful',
    data: { accessToken: token, role: 'admin' },
    pagination: null,
    error: null,
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
};

export const createSeller = async (req, res) => {
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

  const { name, email, mobile, country, state, skills, password } = req.body;

  const exists = await Seller.findOne({ email });
  if (exists) return res.status(409).json({
    success: false,
    status: 409,
    message: 'Seller already exists with this email',
    data: null,
    pagination: null,
    error: { code: 'CONFLICT' },
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });

  const hashed = await hashPassword(password);
  const seller = await Seller.create({ name, email, mobile, country, state, skills, password: hashed });
  return res.status(201).json({
    success: true,
    status: 201,
    message: 'Seller created',
    data: { _id: seller._id, email: seller.email },
    pagination: null,
    error: null,
    meta: { path: req.originalUrl, method: req.method, timestamp: new Date().toISOString() },
  });
};

export const listSellers = async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.max(parseInt(req.query.limit || '10', 10), 1);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Seller.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Seller.countDocuments(),
  ]);

  return res.status(200).json({
    success: true,
    status: 200,
    message: 'Sellers fetched',
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
