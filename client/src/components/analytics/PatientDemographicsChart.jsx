import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PatientDemographicsChart = ({ data }) => {
  const ageData = [
    { name: '0-18', value: data.age?.['0-18'] || 0 },
    { name: '19-35', value: data.age?.['19-35'] || 0 },
    { name: '36-50', value: data.age?.['36-50'] || 0 },
    { name: '51-65', value: data.age?.['51-65'] || 0 },
    { name: '65+', value: data.age?.['65+'] || 0 },
  ];

  const genderData = [
    { name: 'Male', value: data.gender?.male || 0 },
    { name: 'Female', value: data.gender?.female || 0 },
    { name: 'Other', value: data.gender?.other || 0 },
  ];

  const AGE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const GENDER_COLORS = ['#3B82F6', '#EC4899', '#10B981'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Patient Demographics
      </h3>
      
      <div className="space-y-6">
        {/* Age Distribution */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Age Distribution</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {ageData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: AGE_COLORS[index] }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Gender Distribution</p>
          <div className="space-y-2">
            {genderData.map((item, index) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(item.value / genderData.reduce((a, b) => a + b.value, 0)) * 100}%`,
                      backgroundColor: GENDER_COLORS[index]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDemographicsChart;
