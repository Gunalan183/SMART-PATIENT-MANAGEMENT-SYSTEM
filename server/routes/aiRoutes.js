import express from 'express';
import {
  chatbot,
  predictDisease,
  classifyRisk,
  getAlerts,
  markAlertRead,
  clearAlerts
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/chatbot', protect, chatbot);
router.post('/predict-disease', protect, predictDisease);
router.post('/classify-risk', protect, classifyRisk);
router.get('/alerts', protect, getAlerts);
router.put('/alerts/:id/read', protect, markAlertRead);
router.delete('/alerts', protect, clearAlerts);

export default router;
