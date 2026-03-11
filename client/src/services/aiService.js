import api from './api';

export const aiService = {
  // Chatbot
  chatbot: async (data) => {
    const response = await api.post('/ai/chatbot', data);
    return response.data;
  },

  // Disease Prediction
  predictDisease: async (data) => {
    const response = await api.post('/ai/predict-disease', data);
    return response.data;
  },

  // Risk Classification
  classifyRisk: async (data) => {
    const response = await api.post('/ai/classify-risk', data);
    return response.data;
  },

  // Get Alerts
  getAlerts: async () => {
    const response = await api.get('/ai/alerts');
    return response.data;
  },

  // Mark Alert as Read
  markAlertRead: async (alertId) => {
    const response = await api.put(`/ai/alerts/${alertId}/read`);
    return response.data;
  },

  // Clear All Alerts
  clearAlerts: async () => {
    const response = await api.delete('/ai/alerts');
    return response.data;
  }
};
