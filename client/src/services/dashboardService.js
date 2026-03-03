import api from './api';

export const dashboardService = {
  getAdminDashboard: async () => {
    const response = await api.get('/dashboard/admin');
    return response.data;
  },

  getDoctorDashboard: async () => {
    const response = await api.get('/dashboard/doctor');
    return response.data;
  }
};
