import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Receipt, 
  UserPlus,
  Activity,
  BarChart3,
  Bot
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isCollapsed }) => {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'doctor', 'receptionist'] },
    { to: '/patients', icon: Users, label: 'Patients', roles: ['admin', 'doctor', 'receptionist'] },
    { to: '/appointments', icon: Calendar, label: 'Appointments', roles: ['admin', 'doctor', 'receptionist'] },
    { to: '/medical-records', icon: FileText, label: 'Medical Records', roles: ['admin', 'doctor'] },
    { to: '/billing', icon: Receipt, label: 'Billing', roles: ['admin', 'receptionist'] },
    { to: '/analytics', icon: BarChart3, label: 'Analytics', roles: ['admin', 'doctor'] },
    { to: '/ai-assistant', icon: Bot, label: 'AI Assistant', roles: ['admin', 'doctor', 'receptionist'] },
    { to: '/register-user', icon: UserPlus, label: 'Register User', roles: ['admin'] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-blue-700 dark:bg-gray-800 text-white min-h-screen flex flex-col flex-shrink-0 transition-all duration-300`}>
      {/* Header */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-blue-600 dark:border-gray-700 flex-shrink-0 transition-all duration-300`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <Activity className={`${isCollapsed ? 'w-8 h-8' : 'w-8 h-8'} flex-shrink-0`} />
          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="text-xl font-bold whitespace-nowrap">SPMS</h1>
              <p className="text-xs text-blue-200 dark:text-gray-400 whitespace-nowrap">Smart Patient Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-3 px-4'} py-3 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-blue-600 dark:bg-gray-700 text-white'
                      : 'text-blue-100 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white'
                  }`
                }
                title={isCollapsed ? item.label : ''}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                
                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
