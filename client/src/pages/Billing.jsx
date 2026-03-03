import { useState, useEffect } from 'react';
import { Plus, Eye } from 'lucide-react';
import { billService } from '../services/billService';
import { patientService } from '../services/patientService';
import { authService } from '../services/authService';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import { formatDate, formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    consultationFee: 0,
    labFee: 0,
    medicineFee: 0,
    discount: 0,
    paymentStatus: 'Pending',
    paymentMethod: 'Cash'
  });

  useEffect(() => {
    fetchBills();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await billService.getAll();
      setBills(response.data);
    } catch (error) {
      toast.error('Failed to load bills');
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
      await billService.create(formData);
      toast.success('Bill created successfully');
      setIsModalOpen(false);
      resetForm();
      fetchBills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const calculateTotal = () => {
    const subtotal = Number(formData.consultationFee) + Number(formData.labFee) + Number(formData.medicineFee);
    const discountAmount = (subtotal * Number(formData.discount)) / 100;
    return subtotal - discountAmount;
  };

  const resetForm = () => {
    setFormData({
      patient: '',
      doctor: '',
      consultationFee: 0,
      labFee: 0,
      medicineFee: 0,
      discount: 0,
      paymentStatus: 'Pending',
      paymentMethod: 'Cash'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Partial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    { header: 'Invoice ID', accessor: 'invoiceId' },
    { header: 'Patient', render: (row) => row.patient?.name },
    { header: 'Date', render: (row) => formatDate(row.date) },
    { header: 'Amount', render: (row) => formatCurrency(row.totalAmount) },
    {
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.paymentStatus)}`}>
          {row.paymentStatus}
        </span>
      )
    },
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
        <h2 className="text-2xl font-bold text-gray-800">Billing & Invoice</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Bill
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <Table columns={columns} data={bills} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="Create Bill"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
              <input
                type="number"
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lab Fee</label>
              <input
                type="number"
                value={formData.labFee}
                onChange={(e) => setFormData({ ...formData, labFee: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Fee</label>
              <input
                type="number"
                value={formData.medicineFee}
                onChange={(e) => setFormData({ ...formData, medicineFee: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                className="input-field"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="input-field"
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Insurance">Insurance</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total Amount:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
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
              Create Bill
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Billing;
