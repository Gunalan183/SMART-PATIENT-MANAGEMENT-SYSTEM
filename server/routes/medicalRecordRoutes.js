import express from 'express';
import { body } from 'express-validator';
import {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  getPatientMedicalHistory,
  updateMedicalRecord,
  deleteMedicalRecord
} from '../controllers/medicalRecordController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Validation rules
const medicalRecordValidation = [
  body('patient').notEmpty().withMessage('Patient is required'),
  body('symptoms').trim().notEmpty().withMessage('Symptoms are required'),
  body('diagnosis').trim().notEmpty().withMessage('Diagnosis is required')
];

// Routes
router.route('/')
  .get(protect, getAllMedicalRecords)
  .post(protect, authorize('doctor', 'admin'), medicalRecordValidation, validate, createMedicalRecord);

router.get('/patient/:patientId', protect, getPatientMedicalHistory);

router.route('/:id')
  .get(protect, getMedicalRecordById)
  .put(protect, authorize('doctor', 'admin'), updateMedicalRecord)
  .delete(protect, authorize('admin'), deleteMedicalRecord);

export default router;
