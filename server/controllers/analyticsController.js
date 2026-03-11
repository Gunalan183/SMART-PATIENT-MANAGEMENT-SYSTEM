import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';
import Bill from '../models/Bill.js';
import MedicalRecord from '../models/MedicalRecord.js';
import User from '../models/User.js';

// @desc    Get comprehensive analytics
// @route   GET /api/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res, next) => {
  try {
    const { days = 30, doctorId } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days));

    // Build query filter
    const dateFilter = { createdAt: { $gte: daysAgo } };
    const appointmentFilter = { date: { $gte: daysAgo } };
    if (doctorId) {
      appointmentFilter.doctor = doctorId;
    }

    // KPIs with comparison to previous period
    const previousPeriodStart = new Date(daysAgo);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - parseInt(days));

    const [
      totalPatients,
      previousPatients,
      totalAppointments,
      previousAppointments,
      revenueData,
      previousRevenueData
    ] = await Promise.all([
      Patient.countDocuments(dateFilter),
      Patient.countDocuments({ 
        createdAt: { $gte: previousPeriodStart, $lt: daysAgo } 
      }),
      Appointment.countDocuments(appointmentFilter),
      Appointment.countDocuments({ 
        date: { $gte: previousPeriodStart, $lt: daysAgo },
        ...(doctorId && { doctor: doctorId })
      }),
      Bill.aggregate([
        { $match: { paymentStatus: 'Paid', date: { $gte: daysAgo } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      Bill.aggregate([
        { 
          $match: { 
            paymentStatus: 'Paid', 
            date: { $gte: previousPeriodStart, $lt: daysAgo } 
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    ]);

    const totalRevenue = revenueData[0]?.total || 0;
    const previousRevenue = previousRevenueData[0]?.total || 0;

    // Calculate percentage changes
    const patientsChange = previousPatients > 0 
      ? ((totalPatients - previousPatients) / previousPatients * 100).toFixed(1)
      : 0;
    const appointmentsChange = previousAppointments > 0
      ? ((totalAppointments - previousAppointments) / previousAppointments * 100).toFixed(1)
      : 0;
    const revenueChange = previousRevenue > 0
      ? ((totalRevenue - previousRevenue) / previousRevenue * 100).toFixed(1)
      : 0;

    // Appointment Trends
    const appointmentTrends = await Appointment.aggregate([
      { $match: appointmentFilter },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);

    // Format appointment trends
    const trendsMap = {};
    appointmentTrends.forEach(item => {
      const date = item._id.date;
      if (!trendsMap[date]) {
        trendsMap[date] = { date, scheduled: 0, completed: 0, cancelled: 0 };
      }
      trendsMap[date][item._id.status.toLowerCase()] = item.count;
    });
    const formattedTrends = Object.values(trendsMap);

    // Revenue Analytics
    const revenueAnalytics = await Bill.aggregate([
      { $match: { paymentStatus: 'Paid', date: { $gte: daysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          revenue: { $sum: '$totalAmount' },
          expenses: { $sum: { $multiply: ['$totalAmount', 0.3] } } // Simulated expenses
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          month: '$_id',
          revenue: 1,
          expenses: 1,
          _id: 0
        }
      }
    ]);

    // Patient Demographics
    const demographics = await Patient.aggregate([
      { $match: { isActive: true } },
      {
        $facet: {
          age: [
            {
              $bucket: {
                groupBy: '$age',
                boundaries: [0, 19, 36, 51, 66, 120],
                default: 'Other',
                output: { count: { $sum: 1 } }
              }
            }
          ],
          gender: [
            { $group: { _id: '$gender', count: { $sum: 1 } } }
          ]
        }
      }
    ]);

    const formattedDemographics = {
      age: {
        '0-18': demographics[0].age.find(a => a._id === 0)?.count || 0,
        '19-35': demographics[0].age.find(a => a._id === 19)?.count || 0,
        '36-50': demographics[0].age.find(a => a._id === 36)?.count || 0,
        '51-65': demographics[0].age.find(a => a._id === 51)?.count || 0,
        '65+': demographics[0].age.find(a => a._id === 66)?.count || 0,
      },
      gender: {
        male: demographics[0].gender.find(g => g._id === 'Male')?.count || 0,
        female: demographics[0].gender.find(g => g._id === 'Female')?.count || 0,
        other: demographics[0].gender.find(g => g._id === 'Other')?.count || 0,
      }
    };

    // Department Performance (simulated based on doctor specializations)
    const departmentPerformance = await User.aggregate([
      { $match: { role: 'doctor', isActive: true } },
      {
        $lookup: {
          from: 'appointments',
          localField: '_id',
          foreignField: 'doctor',
          as: 'appointments'
        }
      },
      {
        $group: {
          _id: '$specialization',
          patients: { $sum: { $size: '$appointments' } }
        }
      },
      { $sort: { patients: -1 } },
      { $limit: 6 },
      {
        $project: {
          department: '$_id',
          patients: 1,
          _id: 0
        }
      }
    ]);

    // Top Diagnoses
    const topDiagnoses = await MedicalRecord.aggregate([
      { $match: { createdAt: { $gte: daysAgo } } },
      { $group: { _id: '$diagnosis', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $project: {
          diagnosis: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // Appointment Heatmap
    const heatmapData = await Appointment.aggregate([
      { $match: appointmentFilter },
      {
        $project: {
          day: { $dayOfWeek: '$date' },
          hour: { $substr: ['$time', 0, 2] }
        }
      },
      {
        $group: {
          _id: { day: '$day', hour: '$hour' },
          count: { $sum: 1 }
        }
      }
    ]);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formattedHeatmap = heatmapData.map(item => ({
      day: dayNames[item._id.day - 1],
      hour: `${item._id.hour}AM`,
      count: item.count
    }));

    // Doctor Performance
    const doctorPerformance = await User.aggregate([
      { $match: { role: 'doctor', isActive: true } },
      {
        $lookup: {
          from: 'appointments',
          let: { doctorId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$doctor', '$$doctorId'] } } },
            { $match: appointmentFilter }
          ],
          as: 'appointments'
        }
      },
      {
        $lookup: {
          from: 'bills',
          let: { doctorId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$doctor', '$$doctorId'] } } },
            { $match: { paymentStatus: 'Paid', date: { $gte: daysAgo } } }
          ],
          as: 'bills'
        }
      },
      {
        $project: {
          name: 1,
          specialization: 1,
          totalPatients: { $size: { $setUnion: ['$appointments.patient', []] } },
          totalAppointments: { $size: '$appointments' },
          completedAppointments: {
            $size: {
              $filter: {
                input: '$appointments',
                as: 'apt',
                cond: { $eq: ['$$apt.status', 'Completed'] }
              }
            }
          },
          revenue: { $sum: '$bills.totalAmount' },
          avgRating: { $avg: '$appointments.rating' }
        }
      },
      {
        $project: {
          name: 1,
          specialization: 1,
          totalPatients: 1,
          totalAppointments: 1,
          completionRate: {
            $cond: [
              { $gt: ['$totalAppointments', 0] },
              { $multiply: [{ $divide: ['$completedAppointments', '$totalAppointments'] }, 100] },
              0
            ]
          },
          avgRating: { $ifNull: ['$avgRating', 4.5] },
          revenue: 1
        }
      },
      { $sort: { revenue: -1 } }
    ]);

    // Generate insights
    const insights = [];
    if (patientsChange > 10) {
      insights.push(`Patient registrations increased by ${patientsChange}% - excellent growth!`);
    }
    if (appointmentsChange < -10) {
      insights.push(`Appointments decreased by ${Math.abs(appointmentsChange)}% - consider promotional campaigns.`);
    }
    if (totalRevenue > previousRevenue) {
      insights.push(`Revenue is up by ${revenueChange}% compared to previous period.`);
    }
    if (topDiagnoses.length > 0) {
      insights.push(`Most common diagnosis: ${topDiagnoses[0].diagnosis} (${topDiagnoses[0].count} cases)`);
    }

    res.json({
      success: true,
      data: {
        kpis: {
          totalPatients,
          patientsChange: parseFloat(patientsChange),
          totalAppointments,
          appointmentsChange: parseFloat(appointmentsChange),
          totalRevenue,
          revenueChange: parseFloat(revenueChange),
          avgWaitTime: 15, // Simulated
          waitTimeChange: -5 // Simulated
        },
        appointmentTrends: formattedTrends,
        revenueAnalytics,
        demographics: formattedDemographics,
        departmentPerformance,
        topDiagnoses,
        appointmentHeatmap: formattedHeatmap,
        doctorPerformance,
        insights
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export analytics report
// @route   GET /api/analytics/export
// @access  Private/Admin
export const exportAnalyticsReport = async (req, res, next) => {
  try {
    // This would generate a PDF report
    // For now, return success message
    res.json({
      success: true,
      message: 'Report export functionality - integrate with PDF library'
    });
  } catch (error) {
    next(error);
  }
};
