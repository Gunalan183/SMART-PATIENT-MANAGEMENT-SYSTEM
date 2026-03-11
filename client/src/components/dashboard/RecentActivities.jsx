import { formatDate } from '../../utils/helpers';

const RecentActivities = ({ activities }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-100">{activity.patient?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Dr. {activity.doctor?.name} • {formatDate(activity.date)}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                {activity.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
