import api from './api';

export const analyticsService = {
  getAnalytics: async (params) => {
    const response = await api.get('/analytics', { params });
    return response.data;
  },

  getDoctors: async () => {
    const response = await api.get('/auth/doctors');
    return response.data;
  },

  exportReport: async (params) => {
    const response = await api.get('/analytics/export', {
      params,
      responseType: 'blob'
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `analytics-report-${new Date().toISOString().split('T')[0]}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return response;
  }
};
