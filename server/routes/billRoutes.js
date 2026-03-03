import express from 'express';
import { body } from 'express-validator';
import {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
  getRevenueStats
} from '../controllers/billController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Validation rules
const billValidation = [
  body('patient').notEmpty().withMessage('Patient is required'),
  body('consultationFee').isNumeric().withMessage('Consultation fee must be a number'),
  body('labFee').isNumeric().withMessage('Lab fee must be a number'),
  body('medicineFee').isNumeric().withMessage('Medicine fee must be a number')
];

// Routes
router.get('/stats/revenue', protect, authorize('admin'), getRevenueStats);

router.route('/')
  .get(protect, getAllBills)
  .post(protect, billValidation, validate, createBill);

router.route('/:id')
  .get(protect, getBillById)
  .put(protect, updateBill)
  .delete(protect, authorize('admin'), deleteBill);

export default router;
