import api from './api';

export const medicalRecordService = {
  getAll: async (params) => {
    const response = await api.get('/medical-records', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/medical-records/${id}`);
    return response.data;
  },

  getPatientHistory: async (patientId) => {
    const response = await api.get(`/medical-records/patient/${patientId}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/medical-records', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/medical-records/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/medical-records/${id}`);
    return response.data;
  }
};
