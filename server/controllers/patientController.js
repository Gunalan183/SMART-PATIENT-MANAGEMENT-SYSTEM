import Patient from '../models/Patient.js';
import { generatePatientId } from '../utils/generateId.js';

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private
export const createPatient = async (req, res, next) => {
  try {
    // Generate unique patient ID
    const patientId = await generatePatientId(Patient);

    const patient = await Patient.create({
      ...req.body,
      patientId
    });

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
export const getAllPatients = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    let query = { isActive: true };

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { patientId: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const patients = await Patient.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Patient.countDocuments(query);

    res.json({
      success: true,
      count: patients.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: patients
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
export const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
export const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      message: 'Patient updated successfully',
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete patient (soft delete)
// @route   DELETE /api/patients/:id
// @access  Private/Admin
export const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient statistics
// @route   GET /api/patients/stats
// @access  Private
export const getPatientStats = async (req, res, next) => {
  try {
    const totalPatients = await Patient.countDocuments({ isActive: true });
    
    // Patients registered this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const newPatientsThisMonth = await Patient.countDocuments({
      isActive: true,
      createdAt: { $gte: startOfMonth }
    });

    res.json({
      success: true,
      data: {
        totalPatients,
        newPatientsThisMonth
      }
    });
  } catch (error) {
    next(error);
  }
};
