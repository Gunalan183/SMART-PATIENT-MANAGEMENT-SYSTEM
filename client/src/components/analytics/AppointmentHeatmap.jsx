import { Clock } from 'lucide-react';

const AppointmentHeatmap = ({ data }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

  const getIntensityColor = (value) => {
    if (value === 0) return 'bg-gray-100 dark:bg-gray-700';
    if (value <= 2) return 'bg-blue-200 dark:bg-blue-900';
    if (value <= 5) return 'bg-blue-400 dark:bg-blue-700';
    if (value <= 8) return 'bg-blue-600 dark:bg-blue-500';
    return 'bg-blue-800 dark:bg-blue-400';
  };

  const getValue = (day, hour) => {
    const item = data.find(d => d.day === day && d.hour === hour);
    return item ? item.count : 0;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Appointment Heatmap
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Peak appointment times by day and hour
      </p>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex gap-1 mb-2 ml-12">
            {hours.map((hour) => (
              <div key={hour} className="w-12 text-xs text-center text-gray-600 dark:text-gray-400">
                {hour}
              </div>
            ))}
          </div>
          
          {days.map((day) => (
            <div key={day} className="flex gap-1 mb-1">
              <div className="w-10 text-xs text-right pr-2 text-gray-600 dark:text-gray-400 flex items-center justify-end">
                {day}
              </div>
              {hours.map((hour) => {
                const value = getValue(day, hour);
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`w-12 h-8 rounded ${getIntensityColor(value)} flex items-center justify-center text-xs font-medium cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all group relative`}
                    title={`${day} ${hour}: ${value} appointments`}
                  >
                    {value > 0 && (
                      <span className="text-white dark:text-gray-900">{value}</span>
                    )}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                      {day} {hour}: {value} appointments
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-600 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700" />
          <div className="w-4 h-4 rounded bg-blue-200 dark:bg-blue-900" />
          <div className="w-4 h-4 rounded bg-blue-400 dark:bg-blue-700" />
          <div className="w-4 h-4 rounded bg-blue-600 dark:bg-blue-500" />
          <div className="w-4 h-4 rounded bg-blue-800 dark:bg-blue-400" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default AppointmentHeatmap;
