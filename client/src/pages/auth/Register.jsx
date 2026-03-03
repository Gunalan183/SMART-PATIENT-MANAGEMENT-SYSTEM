import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';

const Register = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receptionist',
    specialization: '',
    phone: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await authService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      toast.success('User registered successfully');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'receptionist',
        specialization: '',
        phone: ''
      });
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Register New User</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Registration Form</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input
                type="password"
                required
                minLength="6"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input-field"
              >
                <option value="receptionist">Receptionist</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {formData.role === 'doctor' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                <input
                  type="text"
                  required
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="input-field"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Register User
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Registered Users</h3>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user._id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user.specialization && (
                      <p className="text-xs text-gray-500 mt-1">{user.specialization}</p>
                    )}
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
