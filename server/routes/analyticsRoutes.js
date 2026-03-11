import express from 'express';
import { getAnalytics, exportAnalyticsReport } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin', 'doctor'), getAnalytics);
router.get('/export', protect, authorize('admin'), exportAnalyticsReport);

export default router;
