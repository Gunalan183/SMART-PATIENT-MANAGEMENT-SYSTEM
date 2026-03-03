import MedicalRecord from '../models/MedicalRecord.js';

// @desc    Create medical record
// @route   POST /api/medical-records
// @access  Private/Doctor
export const createMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.create({
      ...req.body,
      doctor: req.user.role === 'doctor' ? req.user.id : req.body.doctor
    });

    const populatedRecord = await MedicalRecord.findById(record._id)
      .populate('patient', 'patientId name age gender')
      .populate('doctor', 'name specialization');

    res.status(201).json({
      success: true,
      message: 'Medical record created successfully',
      data: populatedRecord
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all medical records
// @route   GET /api/medical-records
// @access  Private
export const getAllMedicalRecords = async (req, res, next) => {
  try {
    const { patient, doctor, page = 1, limit = 10 } = req.query;

    let query = {};
    if (patient) query.patient = patient;
    if (doctor) query.doctor = doctor;

    const records = await MedicalRecord.find(query)
      .populate('patient', 'patientId name age gender')
      .populate('doctor', 'name specialization')
      .sort({ visitDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await MedicalRecord.countDocuments(query);

    res.json({
      success: true,
      count: records.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get medical record by ID
// @route   GET /api/medical-records/:id
// @access  Private
export const getMedicalRecordById = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patient')
      .populate('doctor', 'name specialization');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient medical history
// @route   GET /api/medical-records/patient/:patientId
// @access  Private
export const getPatientMedicalHistory = async (req, res, next) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
      .populate('doctor', 'name specialization')
      .sort({ visitDate: -1 });

    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update medical record
// @route   PUT /api/medical-records/:id
// @access  Private/Doctor
export const updateMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('patient', 'patientId name')
      .populate('doctor', 'name specialization');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    res.json({
      success: true,
      message: 'Medical record updated successfully',
      data: record
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete medical record
// @route   DELETE /api/medical-records/:id
// @access  Private/Admin
export const deleteMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }

    res.json({
      success: true,
      message: 'Medical record deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
