import express from 'express';
import { body } from 'express-validator';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientStats
} from '../controllers/patientController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Validation rules
const patientValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 0 }).withMessage('Valid age is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('bloodGroup').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Valid blood group is required')
];

// Routes
router.route('/')
  .get(protect, getAllPatients)
  .post(protect, authorize('admin', 'receptionist'), patientValidation, validate, createPatient);

router.get('/stats', protect, getPatientStats);

router.route('/:id')
  .get(protect, getPatientById)
  .put(protect, authorize('admin', 'receptionist'), updatePatient)
  .delete(protect, authorize('admin'), deletePatient);

export default router;
