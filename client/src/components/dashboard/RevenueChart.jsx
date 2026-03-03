import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMonthName } from '../../utils/helpers';

const RevenueChart = ({ data }) => {
  const chartData = data.map(item => ({
    month: getMonthName(item._id.month),
    revenue: item.revenue
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
