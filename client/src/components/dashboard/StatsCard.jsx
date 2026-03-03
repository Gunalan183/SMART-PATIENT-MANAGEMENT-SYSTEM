const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${color} opacity-80 mb-1`}>{title}</p>
          <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
        </div>
        <div className={`${color} opacity-20`}>
          <Icon className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
