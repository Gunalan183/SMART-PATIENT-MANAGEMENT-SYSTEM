import { formatDate } from '../../utils/helpers';

const UpcomingAppointments = ({ appointments }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upcoming Appointments</h3>
      <div className="space-y-3">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{appointment.patient?.name}</p>
                <p className="text-sm text-gray-500">{appointment.patient?.patientId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">{appointment.time}</p>
                <p className="text-xs text-gray-500">{formatDate(appointment.date)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
