import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';
import Bill from '../models/Bill.js';
import User from '../models/User.js';

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/admin
// @access  Private/Admin
export const getAdminDashboard = async (req, res, next) => {
  try {
    // Total counts
    const totalPatients = await Patient.countDocuments({ isActive: true });
    const totalDoctors = await User.countDocuments({ role: 'doctor', isActive: true });

    // Today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: { $ne: 'Cancelled' }
    });

    // Monthly revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenueData = await Bill.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
          date: { $gte: startOfMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const monthlyRevenue = monthlyRevenueData[0]?.total || 0;

    // Patient growth (last 7 months)
    const patientGrowth = await Patient.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 7)) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Monthly revenue chart (last 8 months)
    const revenueChart = await Bill.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
          date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 8)) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Recent activities
    const recentAppointments = await Appointment.find()
      .populate('patient', 'patientId name')
      .populate('doctor', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          totalPatients,
          totalDoctors,
          todayAppointments,
          monthlyRevenue
        },
        patientGrowth,
        revenueChart,
        recentActivities: recentAppointments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor dashboard stats
// @route   GET /api/dashboard/doctor
// @access  Private/Doctor
export const getDoctorDashboard = async (req, res, next) => {
  try {
    const doctorId = req.user.id;

    // Today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: today, $lt: tomorrow },
      status: { $ne: 'Cancelled' }
    })
      .populate('patient', 'patientId name phone age gender')
      .sort({ time: 1 });

    // Total patients treated
    const totalPatients = await Appointment.distinct('patient', {
      doctor: doctorId,
      status: 'Completed'
    });

    // Upcoming appointments
    const upcomingAppointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: new Date() },
      status: 'Scheduled'
    })
      .populate('patient', 'patientId name phone')
      .sort({ date: 1, time: 1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          todayAppointments: todayAppointments.length,
          totalPatients: totalPatients.length,
          upcomingAppointments: upcomingAppointments.length
        },
        todayAppointmentsList: todayAppointments,
        upcomingAppointmentsList: upcomingAppointments
      }
    });
  } catch (error) {
    next(error);
  }
};
