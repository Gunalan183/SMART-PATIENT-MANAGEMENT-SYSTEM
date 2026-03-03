import api from './api';

export const billService = {
  getAll: async (params) => {
    const response = await api.get('/bills', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/bills/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/bills', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/bills/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/bills/${id}`);
    return response.data;
  },

  getRevenueStats: async () => {
    const response = await api.get('/bills/stats/revenue');
    return response.data;
  }
};
