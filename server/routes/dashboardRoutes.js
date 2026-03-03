import express from 'express';
import {
  getAdminDashboard,
  getDoctorDashboard
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/admin', protect, authorize('admin'), getAdminDashboard);
router.get('/doctor', protect, authorize('doctor'), getDoctorDashboard);

export default router;
