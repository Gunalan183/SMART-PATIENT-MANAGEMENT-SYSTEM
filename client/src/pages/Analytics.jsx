import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Download, Filter, Calendar,
  Users, Activity, DollarSign, Clock, AlertCircle
} from 'lucide-react';
import { analyticsService } from '../services/analyticsService';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

// Import chart components
import KPICard from '../components/analytics/KPICard';
import AppointmentTrendsChart from '../components/analytics/AppointmentTrendsChart';
import DepartmentPerformanceChart from '../components/analytics/DepartmentPerformanceChart';
import PatientDemographicsChart from '../components/analytics/PatientDemographicsChart';
import RevenueAnalyticsChart from '../components/analytics/RevenueAnalyticsChart';
import DoctorPerformanceTable from '../components/analytics/DoctorPerformanceTable';
import AppointmentHeatmap from '../components/analytics/AppointmentHeatmap';
import TopDiagnosesChart from '../components/analytics/TopDiagnosesChart';

const Analytics = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30'); // days
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
    fetchDoctors();
  }, [dateRange, selectedDoctor]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await analyticsService.getAnalytics({
        days: dateRange,
        doctorId: selectedDoctor !== 'all' ? selectedDoctor : undefined
      });
      setAnalyticsData(response.data);
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await analyticsService.getDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error('Failed to fetch doctors');
    }
  };

  const handleExport = async () => {
    try {
      toast.success('Exporting analytics report...');
      await analyticsService.exportReport({ days: dateRange });
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive insights and performance metrics
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Date Range Filter */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 3 Months</option>
              <option value="180">Last 6 Months</option>
              <option value="365">Last Year</option>
            </select>

            {/* Doctor Filter */}
            {user.role === 'admin' && (
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Doctors</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.name}
                  </option>
                ))}
              </select>
            )}

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Patients"
          value={analyticsData?.kpis.totalPatients || 0}
          change={analyticsData?.kpis.patientsChange || 0}
          icon={Users}
          color="blue"
        />
        <KPICard
          title="Total Appointments"
          value={analyticsData?.kpis.totalAppointments || 0}
          change={analyticsData?.kpis.appointmentsChange || 0}
          icon={Calendar}
          color="green"
        />
        <KPICard
          title="Total Revenue"
          value={`$${(analyticsData?.kpis.totalRevenue || 0).toLocaleString()}`}
          change={analyticsData?.kpis.revenueChange || 0}
          icon={DollarSign}
          color="teal"
        />
        <KPICard
          title="Avg Wait Time"
          value={`${analyticsData?.kpis.avgWaitTime || 0} min`}
          change={analyticsData?.kpis.waitTimeChange || 0}
          icon={Clock}
          color="orange"
          inverse
        />
      </div>

      {/* Main Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentTrendsChart data={analyticsData?.appointmentTrends || []} />
        <RevenueAnalyticsChart data={analyticsData?.revenueAnalytics || []} />
      </div>

      {/* Main Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PatientDemographicsChart data={analyticsData?.demographics || {}} />
        <DepartmentPerformanceChart data={analyticsData?.departmentPerformance || []} />
        <TopDiagnosesChart data={analyticsData?.topDiagnoses || []} />
      </div>

      {/* Heatmap */}
      <AppointmentHeatmap data={analyticsData?.appointmentHeatmap || []} />

      {/* Doctor Performance Table */}
      <DoctorPerformanceTable data={analyticsData?.doctorPerformance || []} />

      {/* Insights Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Key Insights
        </h3>
        <div className="space-y-3">
          {analyticsData?.insights?.map((insight, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded"
            >
              <p className="text-gray-800 dark:text-gray-200">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
