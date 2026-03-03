import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getMe,
  getAllUsers,
  getDoctors
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'doctor', 'receptionist']).withMessage('Invalid role')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Routes
router.post('/register', protect, authorize('admin'), registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/doctors', protect, getDoctors);

export default router;
