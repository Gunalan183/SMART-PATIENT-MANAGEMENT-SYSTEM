import { useState, useEffect } from 'react';
import { Plus, Eye } from 'lucide-react';
import { medicalRecordService } from '../services/medicalRecordService';
import { patientService } from '../services/patientService';
import { authService } from '../services/authService';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    symptoms: '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
    labTests: 'None',
    followUpDate: '',
    notes: ''
  });

  useEffect(() => {
    fetchRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await medicalRecordService.getAll();
      setRecords(response.data);
    } catch (error) {
      toast.error('Failed to load medical records');
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await patientService.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Failed to load patients');
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await authService.getDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error('Failed to load doctors');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await medicalRecordService.create(formData);
      toast.success('Medical record created successfully');
      setIsModalOpen(false);
      resetForm();
      fetchRecords();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const removeMedicine = (index) => {
    const newMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: newMedicines });
  };

  const updateMedicine = (index, field, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index][field] = value;
    setFormData({ ...formData, medicines: newMedicines });
  };

  const resetForm = () => {
    setFormData({
      patient: '',
      doctor: '',
      symptoms: '',
      diagnosis: '',
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
      labTests: 'None',
      followUpDate: '',
      notes: ''
    });
  };

  const columns = [
    { header: 'Patient', render: (row) => `${row.patient?.name} (${row.patient?.patientId})` },
    { header: 'Doctor', render: (row) => `Dr. ${row.doctor?.name}` },
    { header: 'Visit Date', render: (row) => formatDate(row.visitDate) },
    { header: 'Diagnosis', accessor: 'diagnosis' },
    {
      header: 'Actions',
      render: (row) => (
        <button className="text-blue-600 hover:text-blue-800">
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Medical Records</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Record
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <Table columns={columns} data={records} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="Add Medical Record"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
              <select
                required
                value={formData.patient}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                className="input-field"
              >
                <option value="">Select patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} ({patient.patientId})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
              <select
                required
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="input-field"
              >
                <option value="">Select doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms *</label>
            <textarea
              required
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
            <textarea
              required
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Medicines</label>
              <button type="button" onClick={addMedicine} className="text-blue-600 text-sm">
                + Add Medicine
              </button>
            </div>
            {formData.medicines.map((medicine, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Medicine name"
                  value={medicine.name}
                  onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={medicine.dosage}
                  onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Frequency"
                  value={medicine.frequency}
                  onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                  className="input-field"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Duration"
                    value={medicine.duration}
                    onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                    className="input-field"
                  />
                  {formData.medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMedicine(index)}
                      className="text-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lab Tests</label>
              <input
                type="text"
                value={formData.labTests}
                onChange={(e) => setFormData({ ...formData, labTests: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field"
              rows="2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MedicalRecords;
