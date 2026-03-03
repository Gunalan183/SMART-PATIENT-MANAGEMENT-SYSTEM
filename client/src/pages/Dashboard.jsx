import { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { dashboardService } from '../services/dashboardService';
import StatsCard from '../components/dashboard/StatsCard';
import PatientGrowthChart from '../components/dashboard/PatientGrowthChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import RecentActivities from '../components/dashboard/RecentActivities';
import UpcomingAppointments from '../components/appointments/UpcomingAppointments';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      let response;
      if (user.role === 'admin') {
        response = await dashboardService.getAdminDashboard();
      } else if (user.role === 'doctor') {
        response = await dashboardService.getDoctorDashboard();
      }
      setDashboardData(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (user.role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Patients"
            value={dashboardData?.stats.totalPatients || 0}
            icon={Users}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatsCard
            title="Total Doctors"
            value={dashboardData?.stats.totalDoctors || 0}
            icon={UserCheck}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatsCard
            title="Today's Appointments"
            value={dashboardData?.stats.todayAppointments || 0}
            icon={Calendar}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatsCard
            title="Monthly Revenue"
            value={formatCurrency(dashboardData?.stats.monthlyRevenue || 0)}
            icon={DollarSign}
            color="text-teal-600"
            bgColor="bg-teal-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PatientGrowthChart data={dashboardData?.patientGrowth || []} />
          <RevenueChart data={dashboardData?.revenueChart || []} />
        </div>

        <RecentActivities activities={dashboardData?.recentActivities || []} />
      </div>
    );
  }

  if (user.role === 'doctor') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Today's Appointments"
            value={dashboardData?.stats.todayAppointments || 0}
            icon={Calendar}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatsCard
            title="Total Patients"
            value={dashboardData?.stats.totalPatients || 0}
            icon={Users}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatsCard
            title="Upcoming"
            value={dashboardData?.stats.upcomingAppointments || 0}
            icon={Calendar}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Appointments</h3>
            <div className="space-y-3">
              {dashboardData?.todayAppointmentsList?.map((appointment) => (
                <div key={appointment._id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{appointment.patient?.name}</p>
                      <p className="text-sm text-gray-500">{appointment.patient?.patientId}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {appointment.patient?.age}y • {appointment.patient?.gender}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-blue-600">{appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <UpcomingAppointments appointments={dashboardData?.upcomingAppointmentsList || []} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-800">Welcome to SPMS</h2>
      <p className="text-gray-600 mt-2">Select a menu item to get started</p>
    </div>
  );
};

export default Dashboard;
