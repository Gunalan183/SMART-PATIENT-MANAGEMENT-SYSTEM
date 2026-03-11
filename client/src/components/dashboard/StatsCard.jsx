const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => {
  // Map light mode colors to dark mode colors
  const getDarkColor = () => {
    if (color.includes('blue')) return 'dark:text-blue-400';
    if (color.includes('green')) return 'dark:text-green-400';
    if (color.includes('purple')) return 'dark:text-purple-400';
    if (color.includes('orange')) return 'dark:text-orange-400';
    if (color.includes('red')) return 'dark:text-red-400';
    if (color.includes('yellow')) return 'dark:text-yellow-400';
    if (color.includes('pink')) return 'dark:text-pink-400';
    if (color.includes('indigo')) return 'dark:text-indigo-400';
    return 'dark:text-gray-300';
  };

  const darkColor = getDarkColor();

  return (
    <div className={`${bgColor} dark:bg-opacity-20 rounded-lg p-6 shadow-sm dark:shadow-gray-900/30`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${color} ${darkColor} opacity-80 mb-1`}>{title}</p>
          <h3 className={`text-3xl font-bold ${color} ${darkColor}`}>{value}</h3>
        </div>
        <div className={`${color} ${darkColor} opacity-20 dark:opacity-40`}>
          <Icon className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
