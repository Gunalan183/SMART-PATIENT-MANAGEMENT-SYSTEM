import Appointment from '../models/Appointment.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res, next) => {
  try {
    const { patient, doctor, date, time } = req.body;

    // Check for existing appointment at same time
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: { $ne: 'Cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    const appointment = await Appointment.create(req.body);

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('patient', 'patientId name phone')
      .populate('doctor', 'name specialization');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: populatedAppointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
export const getAllAppointments = async (req, res, next) => {
  try {
    const { date, doctor, status, page = 1, limit = 10 } = req.query;

    let query = {};

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (doctor) query.doctor = doctor;
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('patient', 'patientId name phone age gender')
      .populate('doctor', 'name specialization')
      .sort({ date: 1, time: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Appointment.countDocuments(query);

    res.json({
      success: true,
      count: appointments.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor', 'name specialization');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('patient', 'patientId name phone')
      .populate('doctor', 'name specialization');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's appointments
// @route   GET /api/appointments/today
// @access  Private
export const getTodayAppointments = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await Appointment.find({
      date: { $gte: today, $lt: tomorrow },
      status: { $ne: 'Cancelled' }
    })
      .populate('patient', 'patientId name phone')
      .populate('doctor', 'name specialization')
      .sort({ time: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming appointments
// @route   GET /api/appointments/upcoming
// @access  Private
export const getUpcomingAppointments = async (req, res, next) => {
  try {
    const now = new Date();
    
    const appointments = await Appointment.find({
      date: { $gte: now },
      status: 'Scheduled'
    })
      .populate('patient', 'patientId name phone')
      .populate('doctor', 'name specialization')
      .sort({ date: 1, time: 1 })
      .limit(5);

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};
