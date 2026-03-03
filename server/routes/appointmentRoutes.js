import express from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getTodayAppointments,
  getUpcomingAppointments
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Validation rules
const appointmentValidation = [
  body('patient').notEmpty().withMessage('Patient is required'),
  body('doctor').notEmpty().withMessage('Doctor is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required')
];

// Routes
router.get('/today', protect, getTodayAppointments);
router.get('/upcoming', protect, getUpcomingAppointments);

router.route('/')
  .get(protect, getAllAppointments)
  .post(protect, appointmentValidation, validate, createAppointment);

router.route('/:id')
  .get(protect, getAppointmentById)
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

export default router;
